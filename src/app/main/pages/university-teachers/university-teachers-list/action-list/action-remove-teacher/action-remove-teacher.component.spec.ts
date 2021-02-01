import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRemoveTeacherComponent } from './action-remove-teacher.component';

describe('ActionRemoveTeacherComponent', () => {
  let component: ActionRemoveTeacherComponent;
  let fixture: ComponentFixture<ActionRemoveTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRemoveTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRemoveTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
