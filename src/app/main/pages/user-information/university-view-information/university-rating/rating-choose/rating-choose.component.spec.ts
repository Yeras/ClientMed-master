import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingChooseComponent } from './rating-choose.component';

describe('RatingChooseComponent', () => {
  let component: RatingChooseComponent;
  let fixture: ComponentFixture<RatingChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
