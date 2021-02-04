import { Component, Input, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Gasto } from 'src/app/models/Gasto.interface';
import { GastoService } from 'src/app/services/gasto.service';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';

@Component({
  selector: 'app-gasto-info',
  templateUrl: './gasto-info.component.html',
  styleUrls: ['./gasto-info.component.scss']
})
export class GastoInfoComponent implements OnInit {

  //input
  @Input() egreso : Egreso;
  @Input() openTable : boolean = false;

  //flag
  isLoaded : boolean = false;
  spawn : boolean = true;

  //arrays
  gastos : Gasto[] | undefined = [];

  constructor(private gastoService : GastoService) { }

  ngOnInit(): void {
    if(this.egreso) {
      this.gastos = this.egreso.gastos;
    }
  }

  ngDoCheck() {
    if(this.gastos) {
      if(this.gastos.length) {
        this.isLoaded = true;
      }
    }
  }

}
