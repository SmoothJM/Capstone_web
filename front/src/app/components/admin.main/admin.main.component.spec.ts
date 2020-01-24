import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.MainComponent } from './admin.main.component';

describe('Admin.MainComponent', () => {
  let component: Admin.MainComponent;
  let fixture: ComponentFixture<Admin.MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin.MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
