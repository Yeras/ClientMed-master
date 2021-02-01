import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTeacherComponent } from './adm-teacher.component';

describe('AdmTeacherComponent', () => {
  let component: AdmTeacherComponent;
  let fixture: ComponentFixture<AdmTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
