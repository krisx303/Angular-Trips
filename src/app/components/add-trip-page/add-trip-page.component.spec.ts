import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripPageComponent } from './add-trip-page.component';

describe('AddTripPageComponent', () => {
  let component: AddTripPageComponent;
  let fixture: ComponentFixture<AddTripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTripPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
