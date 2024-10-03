import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './modules/main/home/home.component';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './modules/common/menu-bar/menu-bar.component';
import { FooterComponent } from './modules/common/footer/footer.component';
import { PrimeNgModule } from './prime-ng.module';
import { HilalFoodComponent } from './modules/main/hilal-food/hilal-food.component';
import { PickupAndDeliveryComponent } from './modules/main/pickup-and-delivery/pickup-and-delivery.component';
import { PrayerSpacesComponent } from './modules/main/prayer-spaces/prayer-spaces.component';
import { LocationFilterComponent } from './modules/common/location-filter/location-filter.component';
import { ReviewsComponent } from './modules/main/shared/reviews/reviews.component';
import { RecentlyAddedComponent } from './modules/main/shared/recently-added/recently-added.component';
import { FiltersComponent } from './modules/main/shared/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HilalFoodComponent,
    PickupAndDeliveryComponent,
    PrayerSpacesComponent,
    MenuBarComponent,
    FooterComponent,
    LocationFilterComponent,
    ReviewsComponent,
    RecentlyAddedComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    PrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
