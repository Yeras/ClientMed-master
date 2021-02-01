import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsDeactivateComponent } from './user-settings-deactivate.component';

describe('UserSettingsDeactivateComponent', () => {
  let component: UserSettingsDeactivateComponent;
  let fixture: ComponentFixture<UserSettingsDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
