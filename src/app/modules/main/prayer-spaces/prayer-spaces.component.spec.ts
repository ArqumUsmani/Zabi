import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerSpacesComponent } from './prayer-spaces.component';

describe('PrayerSpacesComponent', () => {
  let component: PrayerSpacesComponent;
  let fixture: ComponentFixture<PrayerSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrayerSpacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
