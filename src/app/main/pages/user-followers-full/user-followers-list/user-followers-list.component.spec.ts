import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowersListComponent } from './user-followers-list.component';

describe('UserFollowersListComponent', () => {
  let component: UserFollowersListComponent;
  let fixture: ComponentFixture<UserFollowersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
