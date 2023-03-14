import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTripPageComponent } from './list-trip-page.component';

describe('ListTripComponent', () => {
  let component: ListTripPageComponent;
  let fixture: ComponentFixture<ListTripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTripPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
