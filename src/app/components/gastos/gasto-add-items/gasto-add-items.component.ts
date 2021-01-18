import { Component, Input, OnInit } from '@angular/core';
import { Gasto } from 'src/app/models/Gasto';
import { SubCategoria } from 'src/app/models/SubCategoria';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';

@Component({
  selector: 'app-gasto-add-items',
  templateUrl: './gasto-add-items.component.html',
  styleUrls: ['./gasto-add-items.component.scss']
})
export class GastoAddItemsComponent implements OnInit {

  
  monto : number = 0;
  concepto : string ="hola";
  total : number = 0;
  currentMonth : number = 0;

  //input
  @Input() chargeItems : boolean = false;
  @Input() categoriaIndex : string = "";
  @Input() categoria : string = "";
  @Input() subCategorias : SubCategoria[] = [];

  //array
  gastos : Gasto[] = [];  
  categoriaIcons : string[] = CategoriaUtil.getAllCategoriaIcon(); 
  
  //invalid feedbacks
  gastosFormsFeedback : string = "";
  
  constructor() { }

  ngOnInit(): void {    
  }

  addGasto(monto : number, concepto : string, idSubCategoria : number) {
    if(this.categoria) {

      //check input fields
      if(monto > 0 && idSubCategoria > 0) {
        //clean invalid feedback
        this.gastosFormsFeedback = "";

        //new gasto
        var sc = this.subCategorias.find(sc => sc.idSubCategoria == idSubCategoria);
        
        let gasto = new Gasto(Number.parseInt(this.categoria),idSubCategoria,1,monto,concepto,sc?.nombre);
        this.gastos.push(gasto);
        this.total += monto;
      } else {
        this.gastosFormsFeedback = "Los campos sub categoria y monto son obligatorios";
      }            
    }    
  }  
}
