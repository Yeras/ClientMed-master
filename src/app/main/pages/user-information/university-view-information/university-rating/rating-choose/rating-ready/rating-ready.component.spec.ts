import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReadyComponent } from './rating-ready.component';

describe('RatingReadyComponent', () => {
  let component: RatingReadyComponent;
  let fixture: ComponentFixture<RatingReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
