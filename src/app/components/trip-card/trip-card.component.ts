import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from 'src/app/models/trip';
@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent {
  @Input() isLogged: boolean = false;
  @Input() reserved: number = 0;
  @Input() trip!: Trip;
  @Input() isCheapest: boolean = false;
  @Input() isMostExpensive: boolean = false;
  @Input() currency: string = 'zł';
  @Output() addReservation = new EventEmitter<void>();
  @Output() removeReservation = new EventEmitter<void>();

  removeTripFromCart(): void {
    this.removeReservation.emit();
  }
  addTripToCart(): void {
    this.addReservation.emit();
  }

  getStringDate(date: string): string {
    let data: string[] = date.split('-');
    return data[2] + '/' + data[1] + '/' + data[0];
  }

  isSoldOut(): boolean {
    return this.reserved == this.trip.maxSlots;
  }

  hasAvaliableReservation(): boolean {
    return this.reserved < this.trip.maxSlots;
  }

  getLeftSlots(): number {
    return this.trip.maxSlots - this.reserved;
  }
}
