import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseHistoryComponent } from './diagnose-history.component';

describe('DiagnoseHistoryComponent', () => {
  let component: DiagnoseHistoryComponent;
  let fixture: ComponentFixture<DiagnoseHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnoseHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
