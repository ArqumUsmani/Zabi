import { LoginComponent } from './modules/authentication/signin/login.component';
import { HilalFoodComponent } from './modules/main/hilal-food/hilal-food.component';
import { HomeComponent } from './modules/main/home/home.component';
import { PickupAndDeliveryComponent } from './modules/main/pickup-and-delivery/pickup-and-delivery.component';
import { PrayerSpacesComponent } from './modules/main/prayer-spaces/prayer-spaces.component';

export const routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'hilal-food', component: HilalFoodComponent },
    { path: 'pickup-and-delivery', component: PickupAndDeliveryComponent },
    { path: 'prayer-spaces', component: PrayerSpacesComponent },
    { path: 'login', component: LoginComponent },
];