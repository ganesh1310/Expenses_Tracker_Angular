import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTrackerComponent } from './expenses-tracker-component';

describe('ExpensesTrackerComponent', () => {
  let component: ExpensesTrackerComponent;
  let fixture: ComponentFixture<ExpensesTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
