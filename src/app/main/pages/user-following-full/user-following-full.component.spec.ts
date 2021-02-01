import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingFullComponent } from './user-following-full.component';

describe('UserFollowingFullComponent', () => {
  let component: UserFollowingFullComponent;
  let fixture: ComponentFixture<UserFollowingFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFollowingFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowingFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
