import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-list-trip-page',
  templateUrl: './list-trip-page.component.html',
  styleUrls: ['./list-trip-page.component.css'],
})
export class ListTripPageComponent {
  constructor(
    private tripService: TripService,
    private cartService: CartService,
    public authService: AuthService
  ) {}
  tripsSub: Subscription | undefined;
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];

  ngOnInit(): void {
    this.tripsSub = this.tripService.getTrips().subscribe((snapshot) => {
      this.trips = snapshot;
      this.filterTrips();
    });
  }

  ngOnDestroy() {
    this.tripsSub?.unsubscribe();
  }

  isMostExpensiveTrip(trip: Trip): boolean {
    return trip.unitPrice == this.getHighestPrice();
  }

  isCheapestTrip(trip: Trip): boolean {
    return trip.unitPrice == this.getLowestPrice();
  }

  getAmountTripWithID(id: string): number {
    return this.cartService.getAmountTripWithID(id);
  }

  onAddReservationClicked(trip: Trip) {
    this.cartService.addReservation(trip);
  }

  onRemoveTripClicked(trip: Trip) {
    this.tripService.removeTrip(trip);
  }

  onRemoveReservationClicked(trip: Trip) {
    this.cartService.removeReservation(trip.id);
  }

  getCurrency(): string {
    return this.cartService.getCurrency();
  }

  getCountries(): string[] {
    return [...new Set(this.getTripsInTheFuture().map((item) => item.country))];
  }
  getTripsInTheFuture(): Trip[] {
    let date = new Date();
    return this.trips.filter((trip) => {
      return new Date(trip.startDate) > date;
    });
  }

  getGlobalHighestPrice(): number {
    return Math.max(
      ...this.getTripsInTheFuture()
        .filter(
          (item) =>
            this.cartService.getAmountTripWithID(item.id) < item.maxSlots
        )
        .map((item) => item.unitPrice)
    );
  }

  getHighestPrice(): number {
    return Math.max(
      ...this.filteredTrips
        .filter(
          (item) =>
            this.cartService.getAmountTripWithID(item.id) < item.maxSlots
        )
        .map((item) => item.unitPrice)
    );
  }

  getGlobalLowestPrice(): number {
    return Math.min(
      ...this.getTripsInTheFuture()
        .filter(
          (item) =>
            this.cartService.getAmountTripWithID(item.id) < item.maxSlots
        )
        .map((item) => item.unitPrice)
    );
  }

  getLowestPrice(): number {
    return Math.min(
      ...this.filteredTrips
        .filter(
          (item) =>
            this.cartService.getAmountTripWithID(item.id) < item.maxSlots
        )
        .map((item) => item.unitPrice)
    );
  }

  // Filtering

  minPrice: number = 0;
  maxPrice: number = 100000000;
  startDate: string = '';
  endDate: string = '';
  countries: string[] = [];

  minPriceEvent(price: number): void {
    this.minPrice = price;
    this.filterTrips();
  }

  maxPriceEvent(price: number): void {
    this.maxPrice = price;
    this.filterTrips();
  }

  startDateEvent(date: string): void {
    this.startDate = date;
    this.filterTrips();
  }

  endDateEvent(date: string): void {
    this.endDate = date;
    this.filterTrips();
  }

  countriesEvent(country: string): void {
    if (this.countries.includes(country)) {
      this.countries.splice(this.countries.indexOf(country), 1);
    } else {
      this.countries.push(country);
    }
    this.filterTrips();
  }

  filterTrips() {
    this.filteredTrips = this.getTripsInTheFuture();
    if (this.startDate != '') {
      let sDate = new Date(this.startDate);
      this.filteredTrips = this.filteredTrips.filter((trip) => {
        return new Date(trip.startDate) >= sDate;
      });
    }
    if (this.endDate != '') {
      let eDate = new Date(this.endDate);
      this.filteredTrips = this.filteredTrips.filter((trip) => {
        return new Date(trip.endDate) <= eDate;
      });
    }
    if (this.countries.length != 0) {
      this.filteredTrips = this.filteredTrips.filter((trip) => {
        return this.countries.includes(trip.country);
      });
    }
    this.filteredTrips = this.filteredTrips.filter((trip) => {
      return this.minPrice <= trip.unitPrice && trip.unitPrice <= this.maxPrice;
    });
  }
}
