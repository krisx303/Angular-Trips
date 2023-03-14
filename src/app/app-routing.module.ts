import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AddTripPageComponent } from './components/add-trip-page/add-trip-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListTripPageComponent } from './components/list-trip-page/list-trip-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { SingleTripPageComponent } from './components/single-trip-page/single-trip-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ManagerGuard } from './guards/manager.guard';

const routes: Routes = [
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'log-in', redirectTo: '/sign-in' },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'register', redirectTo: '/sign-up' },
  { path: 'home', component: HomePageComponent },
  { path: 'trips/:id', component: SingleTripPageComponent },
  { path: 'trips', component: ListTripPageComponent },
  {
    path: 'add-trip',
    component: AddTripPageComponent,
    canActivate: [ManagerGuard],
  },
  { path: 'basket', component: BasketPageComponent, canActivate: [AuthGuard] },
  {
    path: 'history',
    component: HistoryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminPageComponent,
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
