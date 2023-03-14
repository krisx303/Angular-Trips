import { Component } from '@angular/core';
import { HistoryItem } from 'src/app/models/history-item';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private cartService: CartService,
    public authService: AuthService
  ) {}

  historyItems: HistoryItem[] = [];

  getNumberOfTrips(): number {
    return this.cartService.getNumberOfTrips();
  }

  hasTripIncoming(): boolean {
    return true;
  }
}
