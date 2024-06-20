import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalexpensesinfoComponent } from './totalexpensesinfo.component';

describe('TotalexpensesinfoComponent', () => {
  let component: TotalexpensesinfoComponent;
  let fixture: ComponentFixture<TotalexpensesinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalexpensesinfoComponent]
    });
    fixture = TestBed.createComponent(TotalexpensesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
