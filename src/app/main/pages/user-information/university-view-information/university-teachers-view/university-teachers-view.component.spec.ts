import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityTeachersViewComponent } from './university-teachers-view.component';

describe('UniversityTeachersViewComponent', () => {
  let component: UniversityTeachersViewComponent;
  let fixture: ComponentFixture<UniversityTeachersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityTeachersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityTeachersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
