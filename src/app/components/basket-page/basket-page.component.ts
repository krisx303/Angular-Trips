import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css'],
})
export class BasketPageComponent {
  constructor(private cartService: CartService) {}
  getCartItems(): CartItem[] {
    return this.cartService.cartItems;
  }

  addReservation(id: string): void {
    this.cartService.addReservationByID(id);
  }

  removeReservation(id: string): void {
    this.cartService.removeReservation(id);
  }

  isSoldOut(item: CartItem): boolean {
    return item.amount == item.maxSlots;
  }

  hasReservations(item: CartItem): boolean {
    return item.amount > 0;
  }

  makePayment(): void {
    this.cartService.makePayment();
  }
}
