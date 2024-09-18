import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import {StyleClassModule} from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    StyleClassModule,
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ChipModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
