import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingDeleteAskComponent } from './chatting-delete-ask.component';

describe('ChattingDeleteAskComponent', () => {
  let component: ChattingDeleteAskComponent;
  let fixture: ComponentFixture<ChattingDeleteAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChattingDeleteAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattingDeleteAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
