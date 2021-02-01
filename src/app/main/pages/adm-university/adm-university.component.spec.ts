import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUniversityComponent } from './adm-university.component';

describe('AdmUniversityComponent', () => {
  let component: AdmUniversityComponent;
  let fixture: ComponentFixture<AdmUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
