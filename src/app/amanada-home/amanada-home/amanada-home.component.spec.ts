import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmanadaHomeComponent } from './amanada-home.component';

describe('AmanadaHomeComponent', () => {
  let component: AmanadaHomeComponent;
  let fixture: ComponentFixture<AmanadaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmanadaHomeComponent]
    });
    fixture = TestBed.createComponent(AmanadaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
