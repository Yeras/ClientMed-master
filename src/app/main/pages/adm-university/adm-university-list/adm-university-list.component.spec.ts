import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUniversityListComponent } from './adm-university-list.component';

describe('AdmUniversityListComponent', () => {
  let component: AdmUniversityListComponent;
  let fixture: ComponentFixture<AdmUniversityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmUniversityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmUniversityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
