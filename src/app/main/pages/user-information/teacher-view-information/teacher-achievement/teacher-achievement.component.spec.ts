import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAchievementComponent } from './teacher-achievement.component';

describe('TeacherAchievementComponent', () => {
  let component: TeacherAchievementComponent;
  let fixture: ComponentFixture<TeacherAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
