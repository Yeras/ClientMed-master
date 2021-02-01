import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementViewEditComponent } from './achievement-view-edit.component';

describe('AchievementViewEditComponent', () => {
  let component: AchievementViewEditComponent;
  let fixture: ComponentFixture<AchievementViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
