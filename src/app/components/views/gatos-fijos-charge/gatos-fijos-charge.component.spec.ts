import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatosFijosChargeComponent } from './gatos-fijos-charge.component';

describe('GatosFijosChargeComponent', () => {
  let component: GatosFijosChargeComponent;
  let fixture: ComponentFixture<GatosFijosChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatosFijosChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatosFijosChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
