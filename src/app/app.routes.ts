import { Component } from '@angular/core';
import { LoginComponent } from './modules/authentication/signin/login.component';
import { HilalFoodComponent } from './modules/main/hilal-food/hilal-food.component';
import { HomeComponent } from './modules/main/home/home.component';
import { PickupAndDeliveryComponent } from './modules/main/pickup-and-delivery/pickup-and-delivery.component';
import { PrayerSpacesComponent } from './modules/main/prayer-spaces/prayer-spaces.component';
import { SettingsComponent } from './modules/settings/settings/settings.component';
import { ProfileComponent } from './modules/settings/profile/profile.component';
import { AddressesComponent } from './modules/settings/addresses/addresses.component';

export const routes = [
    { path: '', component: SettingsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'hilal-food', component: HilalFoodComponent },
    { path: 'pickup-and-delivery', component: PickupAndDeliveryComponent },
    { path: 'prayer-spaces', component: PrayerSpacesComponent },
    { path: 'settings', component: SettingsComponent,
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'addresses', component: AddressesComponent }
        ]
     },
    { path: 'login', component: LoginComponent },
];