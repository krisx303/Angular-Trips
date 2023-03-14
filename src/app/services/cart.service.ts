import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Trip } from '../models/trip';
import { Firestore, doc, runTransaction } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private firestore: Firestore) {}

  cartItems: CartItem[] = [];

  currency: string = 'zł';

  getCurrency(): string {
    return this.currency;
  }
  getNumberOfTrips(): number {
    return this.cartItems.length;
  }

  getAmountTripWithID(id: string): number {
    let trip = this.cartItems.filter((item) => item.tripID == id).at(0);
    if (trip == undefined) return 0;
    return trip.amount;
  }

  removeReservation(id: string): void {
    let trip = this.cartItems.filter((item) => item.tripID == id).at(0);
    if (trip == undefined) return;
    if (trip!.amount > 0) trip!.amount -= 1;
    if (trip!.amount == 0)
      this.cartItems.splice(this.cartItems.indexOf(trip!), 1);
  }

  addReservation(data: Trip) {
    let trip = this.cartItems.filter((item) => item.tripID == data.id).at(0);
    if (trip == undefined) {
      trip = {
        tripID: data.id,
        amount: 0,
        maxSlots: data.maxSlots,
        unitPrice: data.unitPrice,
        name: data.name,
      } as CartItem;
      this.cartItems.push(trip);
    }
    if (trip.maxSlots - trip.amount > 0) trip.amount += 1;
  }

  addReservationByID(id: string): void {
    let trip = this.cartItems.filter((item) => item.tripID == id).at(0);
    if (trip!.maxSlots - trip!.amount > 0) trip!.amount += 1;
  }

  getTotalValueOfCart(): number {
    return 0;
  }

  async makePayment(): Promise<void> {
    const userID = JSON.parse(localStorage.getItem('user')!).uid;
    this.cartItems.forEach((item) => {
      this.makeTripUpdate(item, userID);
    });
    this.cartItems = [];
  }

  async makeTripUpdate(item: CartItem, userID: string): Promise<void> {
    const tripRef = doc(this.firestore, 'trips', item.tripID);
    const userTripRef = doc(
      this.firestore,
      `users/${userID}/trips`,
      item.tripID
    );
    try {
      await runTransaction(this.firestore, async (transaction) => {
        const sfDoc = await transaction.get(tripRef);
        const utDoc = await transaction.get(userTripRef);
        if (!sfDoc.exists()) {
          throw 'Document does not exist!';
        }

        const oldMaxSlots = sfDoc.data()['maxSlots'];

        if (oldMaxSlots - item.amount < 0) {
          console.log('There is no enough slots to reserve');
          return;
        }

        const newMaxSlots = sfDoc.data()['maxSlots'] - item.amount;

        transaction.update(tripRef, { maxSlots: newMaxSlots });
        if (!utDoc.exists()) {
          transaction.set(userTripRef, {
            id: item.tripID,
            amount: item.amount,
          });
        } else {
          transaction.update(userTripRef, {
            amount: item.amount + utDoc.data()['amount'],
          });
        }
      });
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
  }
}
