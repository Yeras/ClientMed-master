import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniveristyTeachersListComponent } from './university-teachers-list.component';

describe('UniveristyTeachersListComponent', () => {
  let component: UniveristyTeachersListComponent;
  let fixture: ComponentFixture<UniveristyTeachersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniveristyTeachersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniveristyTeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
