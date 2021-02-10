import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { Activo } from 'src/app/models/Activo.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { ActivoService } from 'src/app/services/activo.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { TipoIngresoService } from 'src/app/services/tipo-ingreso.service';
import { DateUtilSpanish } from '../../../util/DateUtilSpanish'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  desktop : boolean = true;
  pasivo : Pasivo | undefined;
  activo : Activo | undefined;
  mes : string;
  usuario: firebase.User | null;
  todayDate : Date;

  //stats
  totalIngresos : number = 0;
  totalGastado : number = 0;
  

  constructor(
    private titleService : Title,
    private pasivoService : PasivoService,
    private auth : AuthService,
    private deviceDetectorService : DeviceDetectorService,
    private activoService : ActivoService) {
      this.desktop = this.deviceDetectorService.isDesktop();  


      this.auth.getCurrentUser().then(resp => {
        this.usuario = resp;

        this.todayDate = new Date();
        this.mes = DateUtilSpanish.monthToString(this.todayDate.getMonth());

        //traigo activos del usuario  
        this.activoService.activos.pipe(take(1)).subscribe(resp => {
          this.activo = resp.find(a => {
            return a.email == this.usuario?.email 
              && a.year == this.todayDate.getFullYear().toString()
              && a.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          });

          //Calcular el total      
          if(this.activo) {
            this.activo?.ingresos?.forEach(e => {
              this.totalIngresos += e.monto!;
            });
          }
        });

        //traigo pasivos del usuario    
        this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
          this.pasivo = resp.find(p => {
            return p.email == this.usuario?.email 
              && p.year == this.todayDate.getFullYear().toString()
              && p.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          });

          //Calcular el total      
          if(this.pasivo) {
            this.pasivo?.egresos?.forEach(e => {
              this.totalGastado += e.total!;
            });
          }

        }); 
      })

    }

  ngOnInit(): void {
    this.titleService.setTitle('WasMo - Home');    
  }

}
