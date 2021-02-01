import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThinkAboutTeacherComponent } from './user-think-about-teacher.component';

describe('UserThinkAboutTeacherComponent', () => {
  let component: UserThinkAboutTeacherComponent;
  let fixture: ComponentFixture<UserThinkAboutTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserThinkAboutTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserThinkAboutTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
