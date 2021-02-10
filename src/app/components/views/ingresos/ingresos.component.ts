import { unary } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { Activo } from 'src/app/models/Activo.interface';
import { ActivoService } from 'src/app/services/activo.service';
import { AuthService } from 'src/app/services/auth.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  providers: [AuthService]
})
export class IngresosComponent implements OnInit {

  activo : Activo | undefined;
  todayDate = new Date();
  desktop : boolean = true;

  constructor(
    private activoService : ActivoService,
    private deviceDetectorService : DeviceDetectorService,
    private auth : AuthService) { 
      this.desktop = this.deviceDetectorService.isDesktop();
    }

  ngOnInit(): void {

    //traer usuario
    this.auth.getCurrentUser().then(u => {

      //traer el activo de este mes del usuario
      this.activoService.activos.pipe(take(1)).subscribe(resp => {
        this.activo = resp.find(a => {
          return a.email == u?.email 
            && a.year == this.todayDate.getFullYear().toString()
            && a.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
        });

        //ordenar ingresos
        this.activo?.ingresos?.sort((a,b) => {
          return b.createDate.toMillis() - a.createDate.toMillis()
        })
      });
    })    
  }

}
