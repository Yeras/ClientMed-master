import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPublicationOnePageComponent } from './user-publication-one-page.component';

describe('UserPublicationOnePageComponent', () => {
  let component: UserPublicationOnePageComponent;
  let fixture: ComponentFixture<UserPublicationOnePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPublicationOnePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPublicationOnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
