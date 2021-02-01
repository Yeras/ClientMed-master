import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPublicationViewListComponent } from './university-publication-view-list.component';

describe('UniversityStoryViewListComponent', () => {
  let component: UniversityPublicationViewListComponent;
  let fixture: ComponentFixture<UniversityPublicationViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityPublicationViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityPublicationViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
