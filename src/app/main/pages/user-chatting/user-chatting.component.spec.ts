import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChattingComponent } from './user-chatting.component';

describe('UserChattingComponent', () => {
  let component: UserChattingComponent;
  let fixture: ComponentFixture<UserChattingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChattingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
