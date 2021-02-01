import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationLikeDislikeComponent } from './publication-like-dislike.component';

describe('PublicationLikeDislikeComponent', () => {
  let component: PublicationLikeDislikeComponent;
  let fixture: ComponentFixture<PublicationLikeDislikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationLikeDislikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationLikeDislikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
