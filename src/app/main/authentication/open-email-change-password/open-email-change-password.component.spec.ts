import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEmailChangePasswordComponent } from './open-email-change-password.component';

describe('OpenEmailChangePasswordComponent', () => {
  let component: OpenEmailChangePasswordComponent;
  let fixture: ComponentFixture<OpenEmailChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenEmailChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEmailChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
