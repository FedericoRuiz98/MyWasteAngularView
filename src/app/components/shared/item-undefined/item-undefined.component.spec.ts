import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUndefinedComponent } from './item-undefined.component';

describe('ItemUndefinedComponent', () => {
  let component: ItemUndefinedComponent;
  let fixture: ComponentFixture<ItemUndefinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUndefinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUndefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
