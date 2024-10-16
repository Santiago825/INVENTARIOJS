import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosVentaComponent } from './puntos-venta.component';

describe('PuntosVentaComponent', () => {
  let component: PuntosVentaComponent;
  let fixture: ComponentFixture<PuntosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
