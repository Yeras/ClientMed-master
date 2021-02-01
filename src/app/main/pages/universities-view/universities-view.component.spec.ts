import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesViewComponent } from './universities-view.component';

describe('UniversitiesViewComponent', () => {
  let component: UniversitiesViewComponent;
  let fixture: ComponentFixture<UniversitiesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitiesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
