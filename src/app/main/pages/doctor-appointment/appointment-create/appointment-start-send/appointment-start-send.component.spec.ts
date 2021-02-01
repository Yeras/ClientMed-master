import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStartSendComponent } from './appointment-start-send.component';

describe('AppointmentStartSendComponent', () => {
  let component: AppointmentStartSendComponent;
  let fixture: ComponentFixture<AppointmentStartSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentStartSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentStartSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
