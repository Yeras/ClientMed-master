import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicationViewComponent } from './home-publication-view.component';

describe('HomePublicationViewComponent', () => {
  let component: HomePublicationViewComponent;
  let fixture: ComponentFixture<HomePublicationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePublicationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePublicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
