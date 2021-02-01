import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingListComponent } from './chatting-list.component';

describe('ChattingListComponent', () => {
  let component: ChattingListComponent;
  let fixture: ComponentFixture<ChattingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChattingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
