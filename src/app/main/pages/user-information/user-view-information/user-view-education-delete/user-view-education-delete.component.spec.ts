import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewEducationDeleteComponent } from './user-view-education-delete.component';

describe('UserViewEducationDeleteComponent', () => {
  let component: UserViewEducationDeleteComponent;
  let fixture: ComponentFixture<UserViewEducationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewEducationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewEducationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
