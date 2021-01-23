import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasivoInfoComponent } from './pasivo-info.component';

describe('PasivoInfoComponent', () => {
  let component: PasivoInfoComponent;
  let fixture: ComponentFixture<PasivoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasivoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasivoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
