import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationPictureComponent } from './user-information-picture.component';

describe('UserInformationPictureComponent', () => {
  let component: UserInformationPictureComponent;
  let fixture: ComponentFixture<UserInformationPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformationPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
