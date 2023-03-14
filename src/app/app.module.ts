import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ListTripPageComponent } from './components/list-trip-page/list-trip-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddTripPageComponent } from './components/add-trip-page/add-trip-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { SingleTripPageComponent } from './components/single-trip-page/single-trip-page.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SafePipe } from './pipes/safe.pipe';
import { RatingComponent } from './components/rating/rating.component';
import { IsInTheFuturePipe } from './pipes/is-in-the-future.pipe';
import { TripFilterComponent } from './components/trip-filter/trip-filter.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
@NgModule({
  declarations: [
    AppComponent,
    ListTripPageComponent,
    NavbarComponent,
    HomePageComponent,
    AddTripPageComponent,
    TripCardComponent,
    SingleTripPageComponent,
    BasketPageComponent,
    HistoryPageComponent,
    PageNotFoundComponent,
    SafePipe,
    RatingComponent,
    IsInTheFuturePipe,
    TripFilterComponent,
    SignInPageComponent,
    SignUpPageComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
