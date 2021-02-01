import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementRegistrationComponent } from './achievement-registration.component';

describe('AchievementRegistrationComponent', () => {
  let component: AchievementRegistrationComponent;
  let fixture: ComponentFixture<AchievementRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
