import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPublicationDeleteComponent } from './university-publication-delete.component';

describe('UniversityPublicationDeleteComponent', () => {
  let component: UniversityPublicationDeleteComponent;
  let fixture: ComponentFixture<UniversityPublicationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPublicationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityPublicationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
