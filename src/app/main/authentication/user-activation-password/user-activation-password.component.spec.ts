import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivationPasswordComponent } from './user-activation-password.component';

describe('UserActivationPasswordComponent', () => {
  let component: UserActivationPasswordComponent;
  let fixture: ComponentFixture<UserActivationPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivationPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivationPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
