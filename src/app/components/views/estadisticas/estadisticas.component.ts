import { Component, OnInit } from '@angular/core';
import { Activo } from 'src/app/models/Activo.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { ActivoService } from 'src/app/services/activo.service';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  pasivo : Pasivo;
  pasivoUndefined : boolean = false;
  activo : Activo;
  activoUndefined : boolean = false;
  todayDate : Date = new Date();

  constructor(
    private activoService : ActivoService,
    private pasivoService : PasivoService,
    private auth : AuthService
  ) { }

  ngOnInit(): void {

    this.auth.getCurrentUser().then(u => {

      if(u){
        let email = u.email;

        //traer activo
        this.activoService.activos.subscribe(resp => {
          let activo = resp.find(a => {
            return a.email == email 
              && a.year == this.todayDate.getFullYear().toString()
              && a.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          });

          if(activo) {
            this.activo = activo;
          } else {
            this.activoUndefined = true;
          }
        });

        //traer pasivo
        this.pasivoService.pasivos.subscribe(resp =>{
          let pasivo = resp.find(p => {
            return p.email == email 
              && p.year == this.todayDate.getFullYear().toString()
              && p.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          });

          if(pasivo) {
            this.pasivo = pasivo;
          } else {
            this.pasivoUndefined = true;
          }
        });
        
      }
    })
  }

}
