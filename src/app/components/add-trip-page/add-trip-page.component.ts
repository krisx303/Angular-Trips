import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ValidationErrors,
  Validators,
  AbstractControlOptions,
  AbstractControl,
} from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/services/trip.service';

export function creatDateRangeValidator() {
  return (form: FormGroup): ValidationErrors | null => {
    const start: Date = new Date(form.get('startDate')!.value);

    const end: Date = new Date(form.get('endDate')!.value);

    if (start && end) {
      const isRangeValid = end.getTime() - start.getTime() >= 0;

      return isRangeValid ? null : { dateRange: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-add-trip-page',
  templateUrl: './add-trip-page.component.html',
  styleUrls: ['./add-trip-page.component.css'],
})
export class AddTripPageComponent {
  submitted: boolean = false;
  constructor(private fb: FormBuilder, private tripService: TripService) {}

  tripForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      country: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      unitPrice: [
        0,
        [Validators.required, Validators.pattern('([1-9])([0-9]*)')],
      ],
      maxSlots: [
        0,
        [Validators.required, Validators.pattern('([1-9])([0-9]*)')],
      ],
      imageLink: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    },
    {
      validators: creatDateRangeValidator(),
    } as AbstractControlOptions
  );

  get f(): { [key: string]: AbstractControl } {
    return this.tripForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.tripForm.markAllAsTouched();
    if (this.tripForm.invalid) return;
    this.tripService.addNewTrip({
      name: this.tripForm.get('name')!.value,
      country: this.tripForm.get('country')!.value,
      description: this.tripForm.get('description')!.value,
      endDate: this.tripForm.get('endDate')!.value,
      startDate: this.tripForm.get('startDate')!.value,
      imageLink: this.tripForm.get('imageLink')!.value,
      maxSlots: this.tripForm.get('maxSlots')!.value,
      unitPrice: this.tripForm.get('unitPrice')!.value,
      rating: [] as Rating[],
      images: [] as string[],
    } as Trip);
    this.tripForm.reset();
  }
}
