import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosFijosPieComponent } from './gastos-fijos-pie.component';

describe('GastosFijosPieComponent', () => {
  let component: GastosFijosPieComponent;
  let fixture: ComponentFixture<GastosFijosPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosFijosPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosFijosPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
