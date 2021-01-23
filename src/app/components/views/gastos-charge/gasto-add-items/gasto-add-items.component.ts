import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/models/Gasto';
import { Pasivo } from 'src/app/models/Pasivo';
import { SubCategoria } from 'src/app/models/SubCategoria';
import { GastoService } from 'src/app/services/gasto.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';

@Component({
  selector: 'app-gasto-add-items',
  templateUrl: './gasto-add-items.component.html',
  styleUrls: ['./gasto-add-items.component.scss']
})
export class GastoAddItemsComponent implements OnInit {

  
  monto : string = "";
  concepto : string ="";
  idSubCategoria : number = 0;
  total : number = 0;
  currentMonth : number = 0;

  //input
  @Input() idPasivo : string = "";
  @Input() chargeItems : boolean = false;
  @Input() categoriaIndex : string = "";
  @Input() categoria : string = "";
  @Input() subCategorias : SubCategoria[] = [];

  //array
  gastos : Gasto[] = [];  
  categoriaIcons : string[] = CategoriaUtil.getAllCategoriaIcon(); 
  
  //invalid feedbacks
  gastosFormsFeedback : string = "";
  
  constructor(
    private gastoServices : GastoService,
    private pasivoService : PasivoService,
    private router: Router) { }

  ngOnInit(): void {    
  }

  private cleanForm() : void {
    this.monto = "";
    this.concepto = ""; 
    this.idSubCategoria = 0;
  }

  addGasto() {
    if(this.categoria) {

      //check input fields
      if(+this.monto != 0 && +this.idSubCategoria > 0) {
        //clean invalid feedback
        this.gastosFormsFeedback = "";

        //new gasto
        var sc = this.subCategorias.find(sc => sc.idSubCategoria == +this.idSubCategoria);      
        let gasto = new Gasto(+this.idSubCategoria,+this.idPasivo,+this.monto,this.concepto.toLowerCase(),sc?.nombre);
        console.log(gasto);

        //pusheo lista de gastos y sumo el total
        this.gastos.push(gasto);
        this.total += +this.monto;

        //clean form
        this.cleanForm();
      } else {
        this.gastosFormsFeedback = "Los campos sub categoria y monto son obligatorios";
      }            
    }    
  }  

  deleteGasto(index : number) : void {
    this.gastos.splice(index,1);
    console.log(this.gastos);
  }

  saveGastos() : void {

    //guardar en la DB todos los gastos
    this.gastos.forEach(g => {
      this.gastoServices.createGasto(g);  
    });    

    //modificar total del pasivo
    this.pasivoService.getPasivoById(+this.idPasivo).subscribe(resp => {
      if(resp.length) {        
        let pasivo : Pasivo = resp[0];
        pasivo.total = this.total;
        this.pasivoService.updatePasivo(pasivo);

        //move to lista de gastos variables
        this.router.navigate(['/gastos/variables']);
      }
    });
  }
}
