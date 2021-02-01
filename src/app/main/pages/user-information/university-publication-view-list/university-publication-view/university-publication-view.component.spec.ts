import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPublicationViewComponent } from './university-publication-view.component';

describe('UniversityPublicationViewComponent', () => {
  let component: UniversityPublicationViewComponent;
  let fixture: ComponentFixture<UniversityPublicationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPublicationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityPublicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
