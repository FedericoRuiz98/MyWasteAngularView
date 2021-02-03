import { Component, Input, OnInit } from '@angular/core';
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
  @Input() idPasivo : number = 0;
  @Input() total : number = 0;
  @Input() openTable : boolean = false;

  //flag
  isLoaded : boolean = false;
  spawn : boolean = true;

  //arrays
  gastos : Gasto[] = [];

  constructor(private gastoService : GastoService) { }

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    /*
    if(this.openTable && this.spawn) {
      this.gastoService.getGastoByPasivo(this.idPasivo).subscribe(resp => {
        resp.forEach(g => {
          let gasto : Gasto = g;
          gasto.subCategoriaNombre = CategoriaUtil.getSubCategoriaString(gasto.idSubCategoria-1);
          this.gastos.push(gasto);

          //no traer mas gastos una vez abierto
          this.spawn = false;
        })      
      })
    }
    */

    if(this.gastos.length) {
      this.isLoaded = true;
    }
  }

}
