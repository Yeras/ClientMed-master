import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingInformationComponent } from './rating-information.component';

describe('RatingInformationComponent', () => {
  let component: RatingInformationComponent;
  let fixture: ComponentFixture<RatingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
