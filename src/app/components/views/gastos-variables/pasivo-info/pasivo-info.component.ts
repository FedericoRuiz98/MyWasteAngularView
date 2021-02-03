import { Component, Input, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Gasto } from 'src/app/models/Gasto.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import { GastoService } from 'src/app/services/gasto.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-pasivo-info',
  templateUrl: './pasivo-info.component.html',
  styleUrls: ['./pasivo-info.component.scss']
})
export class PasivoInfoComponent implements OnInit {

  //flags
  isLoaded : boolean = false;

  //ids
  idCategoria : number = 0;
  idFormaDePago : number = 0;

  //arrays
  gastos : Gasto[] = [];
  pasivos : Pasivo[] = [];
  openTable : boolean[] = [];

  //input
  @Input() idEgreso : number = 0;
  @Input() year : string = "";
  @Input() mes : string = "";
  @Input() total : number = 0;


  constructor(
    private pasivoService : PasivoService,
    private gastoService : GastoService,
    private formaDePagoService : FormaDePagoService) { }

  ngOnInit(): void {
        
    //traer pasivos
    /*this.pasivoService.getPasivoByEgreso(this.idEgreso).subscribe(resp => {      
      if(resp.length) {
        //guardos todos los pasivos en una lista
        resp.forEach(p => {
          let pasivo : Pasivo = p;
          p.categoriaIcon = CategoriaUtil.getCategoriaIcon(p.idCategoria-1);
          p.categoria = CategoriaUtil.getCategoriaString(p.idCategoria.toString());
          this.pasivos.push(pasivo);
        }); 

        //ordenar
        this.pasivos.sort((a: Pasivo, b: Pasivo) => {
          return b.idPasivo - a.idPasivo;
        });      

        //lista parar abir los gastos
        for (let i = 0; i < resp.length; i++) {
          this.openTable.push(false);           
        }
        console.log(this.openTable);         
      }                       
    });*/

    //traer gastos
    /*this.gastoService.getAllGasto().subscribe(resp => {
      this.gastos = resp;
    });*/
  }

  ngDoCheck() {
    if(this.pasivos.length) {
      this.isLoaded = true;
    }
  }

  toggleGastos(index : number) : void {
    this.openTable[index] = !this.openTable[index];
  }

}
