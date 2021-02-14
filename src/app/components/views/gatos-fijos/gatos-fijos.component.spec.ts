import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatosFijosComponent } from './gatos-fijos.component';

describe('GatosFijosComponent', () => {
  let component: GatosFijosComponent;
  let fixture: ComponentFixture<GatosFijosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatosFijosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatosFijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
