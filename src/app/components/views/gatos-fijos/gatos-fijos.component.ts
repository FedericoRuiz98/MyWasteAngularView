import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { Activo } from 'src/app/models/Activo.interface';
import { EgresoFijo } from 'src/app/models/EgresoFijo.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { ActivoService } from 'src/app/services/activo.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-gatos-fijos',
  templateUrl: './gatos-fijos.component.html',
  styleUrls: ['./gatos-fijos.component.scss']
})
export class GatosFijosComponent implements OnInit {

  pasivo : Pasivo | undefined;
  desktop : boolean = true;
  todayDate = new Date();
  egresosFijos : EgresoFijo[] = [];
  egresosUndefined : boolean = false;
  
  constructor(
    private pasivoService : PasivoService,
    private auth : AuthService,
    private deviceDetectorService : DeviceDetectorService) {
      this.desktop = this.deviceDetectorService.isDesktop();
     }

  ngOnInit(): void {    

    //traer usuario
    this.auth.getCurrentUser().then(u => {

      //traer el pasivo de este mes del usuario
      this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
        let pasivo = resp.find(a => {
          return a.email == u?.email 
            && a.year == this.todayDate.getFullYear().toString()
            && a.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
        });

        if(pasivo) {
          this.pasivo = pasivo;

          //hay egresos fijos?
          if(this.pasivo.egresosFijos) {
            //ordenar egresos fijos
            this.pasivo?.egresosFijos?.sort((a,b) => {
              return b.createDate.toMillis() - a.createDate.toMillis()
            })

            this.egresosFijos = this.pasivo!.egresosFijos!;
          } else {
            this.egresosUndefined = true;
          }          
        } else {
          this.egresosUndefined = true;
        }
      });
    })   
  }

}
