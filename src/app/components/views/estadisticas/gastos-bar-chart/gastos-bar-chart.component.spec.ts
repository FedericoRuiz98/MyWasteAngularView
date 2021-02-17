import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosBarChartComponent } from './gastos-bar-chart.component';

describe('GastosBarChartComponent', () => {
  let component: GastosBarChartComponent;
  let fixture: ComponentFixture<GastosBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
