import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaSubCategorias } from 'src/app/models/categoriaSubCategorias';
import { FormaDePago } from 'src/app/models/FormaDePago';
import { Gasto } from 'src/app/models/Gasto';
import { SubCategoria } from 'src/app/models/SubCategoria';
import { CategoriaSubCategoriaService } from 'src/app/services/categoria-sub-categoria.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import { SubCategoriaService } from 'src/app/services/sub-categoria.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {  

  chargeItems : boolean = false;
  idCategoria : string = "";
  idEgreso : string = "";
  idPasivo : string = "";
  categoria : string = "";
  monto : number = 0;
  concepto : string ="hola";
  total : number = 0;
  currentMonth : number = 0;

  //statics arrays
  categorias : Categoria[] = [];
  subCategorias : SubCategoria[] = [];
  formasDePago : FormaDePago[] = [];
  categoriasSubCategorias : CategoriaSubCategorias[] = [];

  //arrays
  gastos : Gasto[] = [];
  subCategoriasSelect : SubCategoria[] = [];
    

  constructor(
    private categoriasService : CategoriaService,
    private formaDePagoService : FormaDePagoService,
    private subCategoriaService : SubCategoriaService,
    private categoriasSubCategoriasService : CategoriaSubCategoriaService) { }

  ngOnInit(): void {
    var currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    console.log("Month: "+DateUtilSpanish.monthToString(this.currentMonth));
    this.getInfoFromDB();
  }

  getInfoFromDB() {
    this.categoriasService.getAllCategorias().subscribe(data => {
      data.forEach(e => {
        let c = new Categoria(e.idCategoria,e.nombre);
        this.categorias.push(c);
      });      
    })

    this.formaDePagoService.getAllFormasDePago().subscribe(data => {
      data.forEach(e => {
        let f = new FormaDePago(e.idFormaDePago,e.nombre);
        this.formasDePago.push(f);
      })
    })

    this.subCategoriaService.getAllSubCategorias().subscribe(data => {
      data.forEach(e => {
        let sc = new SubCategoria(e.idSubCategoria,e.nombre);
        this.subCategorias.push(sc);
      })
    })

    this.categoriasSubCategoriasService.getAllCategoriasRelation().subscribe(data => {
      data.forEach(e => {
        let csc = new CategoriaSubCategorias(e.idCategoria,e.idSubCategoria);
        this.categoriasSubCategorias.push(csc);
      })
    })
  }

  onCategoriasReady(event : any) {
    this.chargeItems = event;
  }

  onSubCategoria(event : SubCategoria[]) {
    this.subCategoriasSelect = event;  
  }

  onCategoriaIndex(event : string) {
    this.idCategoria = event;
  }

  onCategoria(event : string) {
    this.categoria = event;
  }
    
  onEgreso(event : string) {
    this.idEgreso = event;
  }

  onPasivo(event : string) {
    this.idPasivo = event;
  }
}
