import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
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
  mes : string;
  usuario: firebase.User | null;
  todayDate : Date;

  //stats
  totalIngresos : number = 6000;
  totalGastado : number = 0;
  

  constructor(
    private titleService : Title,
    private pasivoService : PasivoService,
    private auth : AuthService,
    private deviceDetectorService : DeviceDetectorService) {
      this.desktop = this.deviceDetectorService.isDesktop();  
      
      this.auth.getCurrentUser().then(resp => {
        this.usuario = resp;

        this.todayDate = new Date();
        this.mes = DateUtilSpanish.monthToString(this.todayDate.getMonth());

        //traigo pasivos del usuario    
        this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
          this.pasivo = resp.find(p => {
            return p.email == this.usuario?.email 
              && p.year == this.todayDate.getFullYear().toString()
              && p.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          });

          console.log(this.pasivo)
          //traer el total      
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
