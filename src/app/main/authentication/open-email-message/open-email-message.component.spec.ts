import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEmailMessageComponent } from './open-email-message.component';

describe('OpenEmailMessageComponent', () => {
  let component: OpenEmailMessageComponent;
  let fixture: ComponentFixture<OpenEmailMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenEmailMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEmailMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
