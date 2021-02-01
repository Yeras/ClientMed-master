import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChattingComponent } from './view-chatting.component';

describe('ViewChattingComponent', () => {
  let component: ViewChattingComponent;
  let fixture: ComponentFixture<ViewChattingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChattingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
