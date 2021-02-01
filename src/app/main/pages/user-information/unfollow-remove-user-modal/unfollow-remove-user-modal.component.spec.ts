import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfollowRemoveUserModalComponent } from './unfollow-remove-user-modal.component';

describe('UnfollowRemoveUserModalComponent', () => {
  let component: UnfollowRemoveUserModalComponent;
  let fixture: ComponentFixture<UnfollowRemoveUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfollowRemoveUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfollowRemoveUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
