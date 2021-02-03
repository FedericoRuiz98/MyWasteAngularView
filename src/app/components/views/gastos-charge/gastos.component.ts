import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Gasto } from 'src/app/models/Gasto.interface';
import { SubCategoria } from 'src/app/models/SubCategoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {  

  egreoso : Egreso;
  categoria : Categoria;
  chargeItems : boolean = false;

  idCategoria : string = "";
  idEgreso : string = "";
  monto : number = 0;
  concepto : string ="hola";
  total : number = 0;
  currentMonth : number = 0;

  //statics arrays
  categorias = this.categoriasService.categorias;
  formasDePago = this.formaDePagoService.formasDePago;

  //arrays
  gastos : Gasto[] = [];
  subCategoriasSelect : SubCategoria[] = [];

  constructor(
    private categoriasService : CategoriaService,
    private formaDePagoService : FormaDePagoService) { }

  ngOnInit(): void {
    var currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
  }
    
  onEgreso(event : Egreso) {
    this.egreoso = event;
  }

  onCategoria(event : Categoria) {
    this.categoria = event;
  }

  onCargarItems(event : boolean) {
    this.chargeItems = event;
  }

}
