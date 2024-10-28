import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/signin/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './modules/main/home/home.component';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './modules/common/menu-bar/menu-bar.component';
import { FooterComponent } from './modules/common/footer/footer.component';
import { PrimeNgModule } from './prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HilalFoodComponent } from './modules/main/hilal-food/hilal-food.component';
import { PickupAndDeliveryComponent } from './modules/main/pickup-and-delivery/pickup-and-delivery.component';
import { PrayerSpacesComponent } from './modules/main/prayer-spaces/prayer-spaces.component';
import { LocationFilterComponent } from './modules/common/location-filter/location-filter.component';
import { ReviewsComponent } from './modules/main/shared/reviews/reviews.component';
import { RecentlyAddedComponent } from './modules/main/shared/recently-added/recently-added.component';
import { FiltersComponent } from './modules/main/shared/filters/filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './modules/authentication/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifySignInComponent } from './modules/authentication/signin/request-otp/verify-sign-in.component';
import { VerifyOtpComponent } from './modules/authentication/signin/verify-otp/verify-otp.component';
import { AuthInterceptor } from './common/interceptors/auth-interceptor';
import { OtpInputComponent } from './modules/authentication/signin/otp-input/otp-input.component';
import { ToastModule } from 'primeng/toast';
import { CommonPubSubService } from './common/Helper/common-pub-sub.service';
import { PhoneDropdownComponent } from './modules/authentication/shared/phone-dropdown/phone-dropdown.component';
import { NumericDirective } from './common/directives/numeric.directive';
import { SettingsComponent } from './modules/settings/settings/settings.component';
import { ProfileComponent } from './modules/settings/profile/profile.component';
import { AddressesComponent } from './modules/settings/addresses/addresses.component';
import { SideMenuComponent } from './modules/settings/side-menu/side-menu.component';
import { AddAddressComponent } from './modules/settings/addresses/add-address/add-address.component';
import { MapComponent } from './modules/common/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { MainComponent } from './modules/main/main/main.component';

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
    FiltersComponent,
    SignupComponent,
    VerifySignInComponent,
    VerifyOtpComponent,
    OtpInputComponent,
    PhoneDropdownComponent,
    SettingsComponent,
    ProfileComponent,
    AddressesComponent,
    SideMenuComponent,
    AddAddressComponent,
    MapComponent,
    MainComponent,
    NumericDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyClWqdvljOC6yPv4LkxJXRsmldaJZwbciI'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    MessageService,
    CommonPubSubService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
