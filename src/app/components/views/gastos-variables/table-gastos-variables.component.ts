import { Component, OnInit } from '@angular/core';
import { Egreso, IEgreso } from 'src/app/models/Egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-table-gastos-variables',
  templateUrl: './table-gastos-variables.component.html',
  styleUrls: ['./table-gastos-variables.component.scss']
})
export class TableGastosVariablesComponent implements OnInit {

  
  idEgreso : number = 0;
  year : string = "";
  mes : string = "";
  total : number = 0;
  fecha : string = "";


  constructor(
    private egresoService : EgresoService) { }

  ngOnInit(): void {
    this.getEgreso();
  }

  private getEgreso() {
    //harcodeado
    let todayDate = new Date();
    const email = "federicofruiz@hotmail.com";
    const mes = DateUtilSpanish.monthToString(todayDate.getMonth());
    const year = todayDate.getFullYear().toString(); 
    this.fecha = mes+" del "+todayDate.getFullYear();
    
    this.egresoService.getEgresosByEmailAndDate(email,mes,year).subscribe(resp => {
      let egreso : Egreso = resp[0];
      this.year = egreso.year;
      this.idEgreso = egreso.idEgreso;
      this.mes = egreso.mes;
      this.total = egreso.total;
    });
  }

}
