import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNotFoundComponent } from './adm-not-found.component';

describe('AdmNotFoundComponent', () => {
  let component: AdmNotFoundComponent;
  let fixture: ComponentFixture<AdmNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
