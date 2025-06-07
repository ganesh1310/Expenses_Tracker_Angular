import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSourcesComponent } from './income-sources-component';

describe('IncomeSourcesComponent', () => {
  let component: IncomeSourcesComponent;
  let fixture: ComponentFixture<IncomeSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeSourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
