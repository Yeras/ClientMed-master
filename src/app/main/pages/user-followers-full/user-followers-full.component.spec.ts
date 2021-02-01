import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowersFullComponent } from './user-followers-full.component';

describe('UserFollowersFullComponent', () => {
  let component: UserFollowersFullComponent;
  let fixture: ComponentFixture<UserFollowersFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowersFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowersFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
