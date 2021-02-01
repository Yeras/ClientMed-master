import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityTeachersComponent } from './university-teachers.component';

describe('UniversityTeachersComponent', () => {
  let component: UniversityTeachersComponent;
  let fixture: ComponentFixture<UniversityTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
