import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosVariablesPieComponent } from './gastos-variables-pie.component';

describe('GastosVariablesPieComponent', () => {
  let component: GastosVariablesPieComponent;
  let fixture: ComponentFixture<GastosVariablesPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosVariablesPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosVariablesPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
