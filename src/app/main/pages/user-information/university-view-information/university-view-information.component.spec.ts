import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityViewInformationComponent } from './university-view-information.component';

describe('UniversityViewInformationComponent', () => {
  let component: UniversityViewInformationComponent;
  let fixture: ComponentFixture<UniversityViewInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityViewInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityViewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
