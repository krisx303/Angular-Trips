import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-single-trip-page',
  templateUrl: './single-trip-page.component.html',
  styleUrls: ['./single-trip-page.component.css'],
})
export class SingleTripPageComponent implements OnInit {
  constructor(
    private tripService: TripService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  tripsSub: Subscription | undefined;
  trip: Trip | undefined;
  id: string | null = null;
  downloaded: boolean = false;
  avgRating: number = 0;
  mapUrl: string =
    'https://maps.google.com/maps?q=$Polska&t=&z=7&ie=UTF8&iwloc=&output=embed';

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id == null) return;
    this.tripService
      .getTripByID(this.id)
      .then((res) => {
        this.onTripDownloaded(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.downloaded = true;
      });
  }
  onTripDownloaded(res: Trip | undefined) {
    this.trip = res;
    this.mapUrl = `https://maps.google.com/maps?q=${
      this.trip!.country
    }&t=&z=7&ie=UTF8&iwloc=&output=embed`;

    this.avgRating = this.calculateAvgRating();
  }

  calculateAvgRating(): number {
    let s = 0;
    if (this.trip!.rating.length == 0) return 0;
    for (let rating of this.trip!.rating) {
      s += rating.rating;
    }
    return s / this.trip!.rating.length;
  }

  getAmountTripWithID(id: string): number {
    return this.cartService.getAmountTripWithID(id);
  }

  getUserRating(): number {
    if (!this.downloaded) return 0;
    if (this.trip?.rating == undefined) return 0;
    let rating = this.trip.rating.find((item) => item.userName == 'default');
    if (rating == undefined) return 0;
    return rating.rating;
  }

  onAddRating(rating: number) {
    if (this.trip!.rating == undefined) this.trip!.rating = [];
    this.trip!.rating.push({
      userName: 'default',
      rating: rating,
    });
    this.avgRating = this.calculateAvgRating();
    this.tripService.addTripRating(rating, this.trip!);
  }

  addReservation(): void {
    this.cartService.addReservation(this.trip!);
  }

  removeReservation(): void {
    this.cartService.removeReservation(this.trip!.id);
  }

  getCurrency(): string {
    return this.cartService.getCurrency();
  }

  isArchived(): boolean {
    let date = new Date();
    let eDate = new Date(this.trip!.endDate);
    return eDate < date;
  }

  isInTheFuture(): boolean {
    let date = new Date();
    let sDate = new Date(this.trip!.startDate);
    return sDate > date;
  }
  // FORM section
  submittedForm: boolean = false;
  reviews: any[] = [];

  form = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
    tripName: ['', [Validators.required]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500),
      ],
    ],
    date: [''],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submittedForm = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.reviews.push({
      username: this.form.get('username')!.value,
      description: this.form.get('description')!.value,
      tripName: this.form.get('tripName')!.value,
      date: this.form.get('date')!.value,
    });
    this.form.reset();
    this.submittedForm = false;
  }
}
