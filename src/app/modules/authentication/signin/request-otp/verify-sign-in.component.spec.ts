import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySignInComponent } from './verify-sign-in.component';

describe('VerifySignInComponent', () => {
  let component: VerifySignInComponent;
  let fixture: ComponentFixture<VerifySignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySignInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
