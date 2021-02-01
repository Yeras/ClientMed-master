import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicationComponent } from './home-publication.component';

describe('HomePublicationComponent', () => {
  let component: HomePublicationComponent;
  let fixture: ComponentFixture<HomePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
