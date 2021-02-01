import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewInformationComponent } from './user-view-information.component';

describe('UserViewInformationComponent', () => {
  let component: UserViewInformationComponent;
  let fixture: ComponentFixture<UserViewInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
