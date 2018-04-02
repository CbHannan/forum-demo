import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetComponent } from './send-reset.component';

describe('SendResetComponent', () => {
  let component: SendResetComponent;
  let fixture: ComponentFixture<SendResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
