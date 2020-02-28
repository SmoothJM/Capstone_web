import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCustomerComponent } from './chat-customer.component';

describe('ChatCustomerComponent', () => {
  let component: ChatCustomerComponent;
  let fixture: ComponentFixture<ChatCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
