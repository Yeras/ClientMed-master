import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNewTokenComponent } from './generate-new-token.component';

describe('GenerateNewTokenComponent', () => {
  let component: GenerateNewTokenComponent;
  let fixture: ComponentFixture<GenerateNewTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateNewTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateNewTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
