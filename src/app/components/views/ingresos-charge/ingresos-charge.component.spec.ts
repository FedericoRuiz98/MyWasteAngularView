import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosChargeComponent } from './ingresos-charge.component';

describe('IngresosChargeComponent', () => {
  let component: IngresosChargeComponent;
  let fixture: ComponentFixture<IngresosChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresosChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresosChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
