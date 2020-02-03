import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDoctorComponent } from './appointment-doctor.component';

describe('AppointmentDoctorComponent', () => {
  let component: AppointmentDoctorComponent;
  let fixture: ComponentFixture<AppointmentDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
