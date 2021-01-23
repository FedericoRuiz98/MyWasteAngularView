import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaSubCategorias } from 'src/app/models/categoriaSubCategorias';
import { Egreso } from 'src/app/models/Egreso';
import { FormaDePago } from 'src/app/models/FormaDePago';
import { Pasivo } from 'src/app/models/Pasivo';
import { SubCategoria } from 'src/app/models/SubCategoria';
import { EgresoService } from 'src/app/services/egreso.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.scss']
})
export class GastoFormComponent implements OnInit {

  subCategoriasFilter : SubCategoria[] = [];  
  categoria : string = "";
  idCategoria : string = "";
  idFormaDePago : string = "";
  idEgreso : string = "";
  idPasivo : string = "";
  currentDateString : string = (new Date()).toISOString().substring(0,10);

  //flags
  isLoaded : boolean = false;
  isCredito : boolean = false;
  chargeItems : boolean = false; //se puede empezar a cargar los items?

  //inputs
  @Input() categorias : Categoria[] = [];
  @Input() subCategorias : SubCategoria[] = [];
  @Input() formasDePago : FormaDePago[] = [];
  @Input() categoriasSubCategorias : CategoriaSubCategorias[] = [];
  
  //output
  @Output() chargeItemsEmitter = new EventEmitter<boolean>(); //Emitter para poder empezar a cargar los items?
  @Output() subCategoriasEmitter = new EventEmitter<SubCategoria[]>();
  @Output() categoriaEmitter = new EventEmitter<string>();
  @Output() categoriaIndexEmitter = new EventEmitter<string>();
  @Output() EgresoIndexEmitter = new EventEmitter<string>();
  @Output() PasivoIndexEmitter = new EventEmitter<string>();

  //invalid feedbacks
  categoriaFromsFeedback : string = "";

  constructor(
    private egresoService : EgresoService,
    private pasivoService : PasivoService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if(this.categorias.length && this.formasDePago.length) {
      this.isLoaded = true;
    }
  }

  //selects
  formaDePagoChange(value : string) {
    this.idFormaDePago = value;
    if(value == "3") {
      this.isCredito = true;
    } else {
      this.isCredito = false;
    }
  }

  categoriaChange(value : string) {
    this.idCategoria = value;
    this.categoria = CategoriaUtil.getCategoriaString(this.idCategoria);
  }

  //Permitir cargar items y filtar sub categorias
  categoriasReady(idCategoria : number,formaDePago : number) {
    if(idCategoria != 0 && formaDePago != 0) {

      //no feedback
      this.categoriaFromsFeedback = "";

      //poder cargar items
      this.dejarCararItems(true);

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

      this.subCategoriasFilter = this.subCategorias; 

      //Crear Egreso Mensual
      this.generateEgreso();           
    } else {
      //feedback
      this.categoriaFromsFeedback = "Los campos categoria y forma de pago son obligatorios";

      //No poder cargar items
      this.dejarCararItems(false);
    }
  }

  private dejarCararItems(flag : boolean) {
    if(flag) {
      this.chargeItems = true;
    } else {
      this.chargeItems = false;      
    }        
  }

  //emitir variables y arrays al padre (Gastos)
  private emitToFather() {
    this.chargeItemsEmitter.emit(this.chargeItems);
    this.subCategoriasEmitter.emit(this.subCategoriasFilter); 
    this.categoriaEmitter.emit(this.categoria);
    this.categoriaIndexEmitter.emit(this.idCategoria); 
    this.EgresoIndexEmitter.emit(this.idEgreso);
    this.PasivoIndexEmitter.emit(this.idPasivo);
  }

  //Crear en la bd el egreso de este mes
  private generateEgreso() : void {

    //harcodeado
    let todayDate = new Date();
    const email = "federicofruiz@hotmail.com";
    const mes = DateUtilSpanish.monthToString(todayDate.getMonth());
    const year = todayDate.getFullYear().toString();    

    this.egresoService.getEgresosByEmailAndDate(email,mes,year).subscribe(resp => {
      if(resp.length == 0) {
        let egreso = new Egreso(email,mes,year);
        this.egresoService.createEgreso(egreso).subscribe(e => {
          console.log("No habia in Egreso previo: id nuevo "+e.idEgreso);
          //crar pasivo del egreso
          this.generatePasivo(e.idEgreso);
        });         
      } else {
        let egreso = resp[0];
        console.log("Hay Egreso previo: id ",egreso.idEgreso);
        this.generatePasivo(egreso.idEgreso);
      }
    },
    error => console.log(error));    
  }

  private generatePasivo(idEgreso : number) : void {
    let todayDate = new Date();
    let pasivo = new Pasivo(+this.idFormaDePago,+this.idCategoria,idEgreso,todayDate);
    
    this.pasivoService.createPasivo(pasivo).subscribe(resp => {
      this.idEgreso = resp.idEgreso.toString();
      this.idPasivo = resp.idPasivo.toString();

      //Como es la ultima operacion que realizon, espero a que termine para mandar la info a su padre
      //emit
      this.emitToFather();
    });
  }
}
