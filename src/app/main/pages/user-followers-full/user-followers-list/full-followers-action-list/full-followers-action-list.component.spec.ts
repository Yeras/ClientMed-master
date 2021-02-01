import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFollowersActionListComponent } from './full-followers-action-list.component';

describe('FullFollowersActionListComponent', () => {
  let component: FullFollowersActionListComponent;
  let fixture: ComponentFixture<FullFollowersActionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullFollowersActionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullFollowersActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
