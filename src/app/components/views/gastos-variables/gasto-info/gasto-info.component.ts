import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
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

  //flags
  desktop : boolean = true;
  isLoaded : boolean = false;
  spawn : boolean = true;

  //arrays
  gastos : Gasto[] | undefined = [];

  constructor(
    private gastoService : GastoService,
    private deviceDetectorService : DeviceDetectorService) { 
      this.desktop = this.deviceDetectorService.isDesktop();
    }
    

  ngOnInit(): void {
    if(this.egreso) {
      this.gastos = this.egreso.gastos;
    }
  }

  ngDoCheck() {
    if(this.gastos!.length) {
      this.isLoaded = true;
    }
   }

}
