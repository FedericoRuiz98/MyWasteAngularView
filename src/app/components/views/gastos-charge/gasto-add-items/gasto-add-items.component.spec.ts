import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoAddItemsComponent } from './gasto-add-items.component';

describe('GastoAddItemsComponent', () => {
  let component: GastoAddItemsComponent;
  let fixture: ComponentFixture<GastoAddItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastoAddItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
