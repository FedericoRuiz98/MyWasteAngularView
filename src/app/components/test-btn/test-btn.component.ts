import { Component, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/Egreso';
import { Persona } from 'src/app/models/auth/Persona';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EgresoService } from 'src/app/services/egreso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { GastoService } from 'src/app/services/gasto.service';

@Component({
  selector: 'app-test-btn',
  templateUrl: './test-btn.component.html',
  styleUrls: ['./test-btn.component.scss']
})
export class TestBtnComponent implements OnInit {

  constructor(private service : GastoService) { }

  ngOnInit(): void {
  }

  public async onClick() {
    //var per = new Persona("Nicolas","Ruiz");

    this.service.getAllGasto();
  }

}
