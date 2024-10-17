import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { SliderModule } from 'primeng/slider';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StyleClassModule,
    BrowserModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ChipModule,
    CardModule,
    SliderModule,
    FormsModule,
    ListboxModule,
    InputSwitchModule,
    ImageModule,
    TooltipModule,
    SharedModule,
    ListboxModule,
    CarouselModule,
    DialogModule,
    AvatarModule,
    CheckboxModule,
    ToastModule,
    DropdownModule
  ],
  exports: [
    StyleClassModule,
    BrowserModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ChipModule,
    CardModule,
    SliderModule,
    FormsModule,
    ListboxModule,
    InputSwitchModule,
    ImageModule,
    TooltipModule,
    SharedModule,
    CarouselModule,
    DialogModule,
    AvatarModule,
    CheckboxModule,
    DropdownModule
  ]
})
export class PrimeNgModule { }
