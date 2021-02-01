import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRatingInformationComponent } from './teacher-rating-information.component';

describe('TeacherRatingInformationComponent', () => {
  let component: TeacherRatingInformationComponent;
  let fixture: ComponentFixture<TeacherRatingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRatingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRatingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
