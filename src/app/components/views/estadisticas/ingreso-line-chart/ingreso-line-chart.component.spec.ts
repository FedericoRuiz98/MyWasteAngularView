import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoLineChartComponent } from './ingreso-line-chart.component';

describe('IngresoLineChartComponent', () => {
  let component: IngresoLineChartComponent;
  let fixture: ComponentFixture<IngresoLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
