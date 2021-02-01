import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAchievementComponent } from './adm-achievement.component';

describe('AdmAchievementComponent', () => {
  let component: AdmAchievementComponent;
  let fixture: ComponentFixture<AdmAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
