import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoInfoComponent } from './gasto-info.component';

describe('GastoInfoComponent', () => {
  let component: GastoInfoComponent;
  let fixture: ComponentFixture<GastoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
