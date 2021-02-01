import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityRegistrationComponent } from './university-registration.component';

describe('UniversityRegistrationComponent', () => {
  let component: UniversityRegistrationComponent;
  let fixture: ComponentFixture<UniversityRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
