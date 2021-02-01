import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityRatingComponent } from './university-rating.component';

describe('UniversityRatingComponent', () => {
  let component: UniversityRatingComponent;
  let fixture: ComponentFixture<UniversityRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
