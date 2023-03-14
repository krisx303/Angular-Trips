import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip';
@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips$: Observable<Trip[]>;

  constructor(private firestore: Firestore) {
    const ref = collection(firestore, 'trips');
    this.trips$ = collectionData(ref, { idField: 'id' }) as Observable<Trip[]>;
  }

  async getTripByID(id: string): Promise<Trip | undefined> {
    const docRef = doc(this.firestore, 'trips', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let t = docSnap.data() as Trip;
      t.id = docSnap.id;
      return t;
    } else {
      return undefined;
    }
  }

  removeTrip(trip: Trip) {
    throw new Error('Method not implemented.');
  }

  async addNewTrip(trip: Trip) {
    await addDoc(collection(this.firestore, 'trips'), trip);
  }

  getTrips(): Observable<Trip[]> {
    return this.trips$;
  }

  async addTripRating(rating: number, trip: Trip) {
    const tripRef = doc(this.firestore, 'trips', trip.id);
    await updateDoc(tripRef, {
      rating: trip.rating,
    });
  }
}
