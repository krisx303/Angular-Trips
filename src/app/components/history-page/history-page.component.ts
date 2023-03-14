import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryItem } from 'src/app/models/history-item';
import { Trip } from 'src/app/models/trip';
import { CartService } from 'src/app/services/cart.service';
import { HistoryService } from 'src/app/services/history.service';
import { TripService } from 'src/app/services/trip.service';

interface Pair {
  historyItem: HistoryItem;
  trip: Trip;
}

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent {
  constructor(
    private tripService: TripService,
    private historyService: HistoryService
  ) {}
  tripsSub: Subscription | undefined;
  trips: Trip[] = [];
  itemsSub: Subscription | undefined;
  items: HistoryItem[] = [];
  pairs: Pair[] = [];

  currentFilter: boolean = true; // For current trips
  inFutureFilter: boolean = true; // For in future trips
  archiveFilter: boolean = true; // For archived trips

  ngOnInit(): void {
    this.tripsSub = this.tripService.getTrips().subscribe((snapshot) => {
      this.trips = snapshot;
      this.pairs = this.getPairs();
    });
    this.itemsSub = this.historyService.getItems().subscribe((snapshot) => {
      this.items = snapshot;
      this.pairs = this.getPairs();
    });
  }

  ngOnDestroy() {
    this.tripsSub?.unsubscribe();
    this.itemsSub?.unsubscribe();
  }

  getFilteredPairs(): Pair[] {
    if (this.archiveFilter && this.currentFilter && this.inFutureFilter)
      return this.pairs;
    return this.pairs.filter((pair) => {
      return (
        (this.archiveFilter && this.isArchive(pair.trip)) ||
        (this.currentFilter && this.isCurrentTrip(pair.trip)) ||
        (this.inFutureFilter && this.isInTheFuture(pair.trip))
      );
    });
  }

  getPairs(): Pair[] {
    let pairs: Pair[] = [];
    this.items.forEach((item) => {
      let trip = this.findTripWithID(item.id);
      pairs.push({
        historyItem: item,
        trip: trip,
      } as Pair);
    });
    return pairs;
  }

  isInTheFuture(trip: Trip): boolean {
    let date = new Date();
    let dStart = new Date(trip.startDate);
    return dStart > date;
  }

  isArchive(trip: Trip): boolean {
    let date = new Date();
    let dEnd = new Date(trip.endDate);
    return dEnd < date;
  }

  isCurrentTrip(trip: Trip): boolean {
    let date = new Date();
    let dStart = new Date(trip.startDate);
    let dEnd = new Date(trip.endDate);
    return dStart < date && date < dEnd;
  }

  findTripWithID(id: string): Trip | undefined {
    return this.trips.find((trip) => trip.id == id);
  }
}
