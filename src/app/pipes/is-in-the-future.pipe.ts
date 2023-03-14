import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'isInTheFuture',
})
export class IsInTheFuturePipe implements PipeTransform {
  transform(trips: Trip[]): Trip[] {
    if (!trips) return [];
    let date = new Date();
    return trips.filter((trip) => {
      let dateTripStart = new Date(trip.startDate);
      return dateTripStart > date;
    });
  }
}
