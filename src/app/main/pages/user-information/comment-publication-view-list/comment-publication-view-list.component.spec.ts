import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPublicationViewListComponent } from './comment-publication-view-list.component';

describe('CommentPublicationViewComponent', () => {
  let component: CommentPublicationViewListComponent;
  let fixture: ComponentFixture<CommentPublicationViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPublicationViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPublicationViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
