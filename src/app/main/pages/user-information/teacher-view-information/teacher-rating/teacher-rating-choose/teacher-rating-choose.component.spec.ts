import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRatingChooseComponent } from './teacher-rating-choose.component';

describe('TeacherRatingChooseComponent', () => {
  let component: TeacherRatingChooseComponent;
  let fixture: ComponentFixture<TeacherRatingChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRatingChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRatingChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
