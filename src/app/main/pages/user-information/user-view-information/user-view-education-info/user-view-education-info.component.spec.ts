import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewEducationInfoComponent } from './user-view-education-info.component';

describe('UserViewEducationInfoComponent', () => {
  let component: UserViewEducationInfoComponent;
  let fixture: ComponentFixture<UserViewEducationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewEducationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewEducationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
