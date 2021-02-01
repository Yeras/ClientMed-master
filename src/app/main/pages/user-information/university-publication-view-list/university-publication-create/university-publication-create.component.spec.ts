import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPublicationCreateComponent } from './university-publication-create.component';

describe('UniversityPublicationCreateComponent', () => {
  let component: UniversityPublicationCreateComponent;
  let fixture: ComponentFixture<UniversityPublicationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPublicationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityPublicationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
