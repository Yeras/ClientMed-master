import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPublicationEditComponent } from './university-publication-edit.component';

describe('UniversityPublicationEditComponent', () => {
  let component: UniversityPublicationEditComponent;
  let fixture: ComponentFixture<UniversityPublicationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPublicationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityPublicationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
