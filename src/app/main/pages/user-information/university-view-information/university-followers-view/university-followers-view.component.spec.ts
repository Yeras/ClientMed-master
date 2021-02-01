import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityFollowersViewComponent } from './university-followers-view.component';

describe('UniversityFollowersViewComponent', () => {
  let component: UniversityFollowersViewComponent;
  let fixture: ComponentFixture<UniversityFollowersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityFollowersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityFollowersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
