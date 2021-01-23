import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGastosVariablesComponent } from './table-gastos-variables.component';

describe('TableGastosVariablesComponent', () => {
  let component: TableGastosVariablesComponent;
  let fixture: ComponentFixture<TableGastosVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGastosVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGastosVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
