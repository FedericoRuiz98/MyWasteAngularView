import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaSubCategorias } from 'src/app/models/categoriaSubCategorias';
import { FormaDePago } from 'src/app/models/FormaDePago';
import { Gasto } from 'src/app/models/Gasto';
import { SubCategoria } from 'src/app/models/SubCategoria';
import { CategoriaSubCategoriaService } from 'src/app/services/categoria-sub-categoria.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import { SubCategoriaService } from 'src/app/services/sub-categoria.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  categoriaIcons : string[] = [
    "fas fa-shopping-basket",
    "fas fa-parachute-box",
    "fas fa-glass-martini-alt",
    "fas fa-money-check",    
    "fas fa-car",
    ""
  ];

  chargeItems : boolean = false;
  categoriaIndex : string = "";
  categoria : string = "";
  monto : number = 0;
  concepto : string ="hola";

  //flags
  isCredito : boolean = false;

  //arrays
  categorias : Categoria[] = [];
  subCategorias : SubCategoria[] = [];
  formasDePago : FormaDePago[] = [];
  categoriasSubCategorias : CategoriaSubCategorias[] = [];
  gastos : Gasto[] = [];
  
  constructor(
    private categoriasService : CategoriaService,
    private formaDePagoService : FormaDePagoService,
    private subCategoriaService : SubCategoriaService,
    private categoriasSubCategoriasService : CategoriaSubCategoriaService) { }

  ngOnInit(): void {
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

  //selects
  formaDePagoChange(value : string) {
    if(value == "3") {
      this.isCredito = true;
    } else {
      this.isCredito = false;
    }
  }

  categoriaChange(value : string) {
    this.categoriaIndex = value;

    switch (value) {
      case "1":
        this.categoria = "Supermercado"
      break;

      case "2":
        this.categoria = "Delivery"
      break;

      case "3":
        this.categoria = "Salida"
      break;

      case "4":
        this.categoria = "Compra"
      break;

      case "5":
        this.categoria = "Vehiculo"
      break;

      case "6":
        this.categoria = "Otros"
      break;
    }
  }

  categoriasReady(idCategoria : number,formaDePago : number) {
    if(idCategoria != 0 && formaDePago != 0) {
      this.chargeItems = true;

      //busco id de las subcategorias que quiero
      this.categoriasSubCategorias = this.categoriasSubCategorias.filter(csc => csc.idCategoria == idCategoria);

      //filtro subcategorias
      let subCategoriasNew : SubCategoria[] = [];
      this.subCategorias.forEach(sc => {
        this.categoriasSubCategorias.forEach(csc => {
          if(sc.idSubCategoria == csc.idSubCategoria) {
            subCategoriasNew.push(sc);
          }
        })
      })

      //subcategorias restantes
      this.subCategorias = subCategoriasNew;

      
      //guardo subcategoria 8
      var scOtros : any; 
      this.subCategorias.forEach(sc => {
        if(sc.idSubCategoria == 8) {
          scOtros = sc;          
        }        
      })

      //pongo subcategoria 8 al final si existe
      if(scOtros) {
        this.subCategorias = this.subCategorias.filter(sc => sc.idSubCategoria != 8);
        this.subCategorias.push(scOtros);
      }
      
      console.log(this.categoriasSubCategorias);
      console.log(this.subCategorias);
    }
  }

  addGasto(monto : number, concepto : string, subCategoria : number) {
    let gasto = new Gasto(1,subCategoria,1,monto,concepto);
    this.gastos.push(gasto);
  }
}
