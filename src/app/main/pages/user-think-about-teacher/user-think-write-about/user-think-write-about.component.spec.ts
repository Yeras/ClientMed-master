import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThinkWriteAboutComponent } from './user-think-write-about.component';

describe('UserThinkWriteAboutComponent', () => {
  let component: UserThinkWriteAboutComponent;
  let fixture: ComponentFixture<UserThinkWriteAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserThinkWriteAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserThinkWriteAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
