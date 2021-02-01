import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPublicationReplyComponent } from './comment-publication-reply.component';

describe('CommentPublicationReplyComponent', () => {
  let component: CommentPublicationReplyComponent;
  let fixture: ComponentFixture<CommentPublicationReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPublicationReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPublicationReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
