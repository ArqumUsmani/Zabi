import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HilalFoodComponent } from './hilal-food.component';

describe('HilalFoodComponent', () => {
  let component: HilalFoodComponent;
  let fixture: ComponentFixture<HilalFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HilalFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HilalFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
