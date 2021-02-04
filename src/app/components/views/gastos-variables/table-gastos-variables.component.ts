import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-table-gastos-variables',
  templateUrl: './table-gastos-variables.component.html',
  styleUrls: ['./table-gastos-variables.component.scss'],
  providers: [AuthService]
})
export class TableGastosVariablesComponent implements OnInit {

  pasivo : Pasivo | undefined;
  todayDate : Date;
  total : number = 0;

  usuario: firebase.User | null;

  constructor(
    private pasivoService : PasivoService,
    private auth: AuthService) { 
      //traigo al usuario
      this.auth.getCurrentUser().then(resp => {
        this.usuario = resp;
        this.todayDate = new Date();

        //traigo los pasivos de este mes y usuario
        this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
          this.pasivo = resp.find(p => {
            return p.email == this.usuario?.email 
              && p.year == this.todayDate.getFullYear().toString()
              && p.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          })

          //calcular total
          if(this.pasivo?.egresos) {
            let egresos : Egreso[] = this.pasivo.egresos;

            console.log(egresos)
            egresos.forEach(e => {
              if(e.total) {
                this.total += e.total;
              }
            })
          }
        });
      });
  }

  ngOnInit(): void {
  }

}
