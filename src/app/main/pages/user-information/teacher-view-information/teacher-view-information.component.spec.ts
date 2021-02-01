import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewInformationComponent } from './teacher-view-information.component';

describe('TeacherViewInformationComponent', () => {
  let component: TeacherViewInformationComponent;
  let fixture: ComponentFixture<TeacherViewInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherViewInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
