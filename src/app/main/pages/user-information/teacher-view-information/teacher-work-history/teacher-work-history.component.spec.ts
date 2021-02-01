import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherWorkHistoryComponent } from './teacher-work-history.component';

describe('TeacherWorkHistoryComponent', () => {
  let component: TeacherWorkHistoryComponent;
  let fixture: ComponentFixture<TeacherWorkHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherWorkHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
