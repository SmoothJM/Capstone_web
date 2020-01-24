import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Doctor.MainComponent } from './doctor.main.component';

describe('Doctor.MainComponent', () => {
  let component: Doctor.MainComponent;
  let fixture: ComponentFixture<Doctor.MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Doctor.MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Doctor.MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
