import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePageViewComponent } from './one-page-view.component';

describe('OnePageViewComponent', () => {
  let component: OnePageViewComponent;
  let fixture: ComponentFixture<OnePageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnePageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
