import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupAndDeliveryComponent } from './pickup-and-delivery.component';

describe('PickupAndDeliveryComponent', () => {
  let component: PickupAndDeliveryComponent;
  let fixture: ComponentFixture<PickupAndDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupAndDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupAndDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
