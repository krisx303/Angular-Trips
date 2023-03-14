import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css'],
})
export class TripFilterComponent {
  @Output() minPriceEvent = new EventEmitter<number>();
  @Output() maxPriceEvent = new EventEmitter<number>();
  @Output() countriesEvent = new EventEmitter<string>();
  @Output() startDateEvent = new EventEmitter<string>();
  @Output() endDateEvent = new EventEmitter<string>();
  @Input() minGlobalPrice: number = 0;
  @Input() maxGlobalPrice: number = 10000;
  @Input() countries: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 10000;
  rangeLeft: string = '0%';
  rangeRight: string = '0%';
  startDate: string = '';
  endDate: string = '';

  minPriceChange(price: number): void {
    if (price == null) {
      this.minPrice = this.minGlobalPrice;
    } else if (price > this.maxPrice) {
      this.minPrice = this.maxPrice;
    } else if (price < this.minGlobalPrice) {
      this.minPrice = this.minGlobalPrice;
    } else {
      this.minPrice = price;
    }
    this.rangeLeft =
      ((this.minPrice - this.minGlobalPrice) /
        (this.maxGlobalPrice - this.minGlobalPrice)) *
        100 +
      '%';
    this.minPriceEvent.emit(this.minPrice);
  }

  maxPriceChange(price: number): void {
    if (price == null) this.maxPrice = this.maxGlobalPrice;
    if (price < this.minPrice) {
      this.maxPrice = this.minPrice;
    } else if (price > this.maxGlobalPrice) {
      this.maxPrice = this.maxGlobalPrice;
    } else {
      this.maxPrice = price;
    }
    this.rangeRight =
      100 -
      ((this.maxPrice - this.minGlobalPrice) /
        (this.maxGlobalPrice - this.minGlobalPrice)) *
        100 +
      '%';
    this.maxPriceEvent.emit(this.maxPrice);
  }

  countryChange(country: string) {
    this.countriesEvent.emit(country);
  }

  startDateChange(date: string) {
    this.startDateEvent.emit(date);
  }

  endDateChange(date: string) {
    this.endDateEvent.emit(date);
  }
}
