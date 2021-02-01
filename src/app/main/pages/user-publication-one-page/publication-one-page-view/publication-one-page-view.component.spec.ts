import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationOnePageViewComponent } from './publication-one-page-view.component';

describe('PublicationOnePageViewComponent', () => {
  let component: PublicationOnePageViewComponent;
  let fixture: ComponentFixture<PublicationOnePageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationOnePageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationOnePageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
