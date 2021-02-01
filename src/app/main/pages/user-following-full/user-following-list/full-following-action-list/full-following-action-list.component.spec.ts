import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFollowingActionListComponent } from './full-following-action-list.component';

describe('FullFollowingActionListComponent', () => {
  let component: FullFollowingActionListComponent;
  let fixture: ComponentFixture<FullFollowingActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFollowingActionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFollowingActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
