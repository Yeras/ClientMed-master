import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityListInfoComponent } from './university-list-info.component';

describe('UniversityListInfoComponent', () => {
  let component: UniversityListInfoComponent;
  let fixture: ComponentFixture<UniversityListInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityListInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
