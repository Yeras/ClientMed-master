import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTeacherListComponent } from './adm-teacher-list.component';

describe('AdmTeacherListComponent', () => {
  let component: AdmTeacherListComponent;
  let fixture: ComponentFixture<AdmTeacherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTeacherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
