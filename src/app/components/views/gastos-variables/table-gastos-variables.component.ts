import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { GastoPorCategoria } from 'src/app/models/stadistics/gastoPorCategoria.interface';
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
  isLoaded : boolean = false;
  categoriaDominante : GastoPorCategoria;

  usuario: firebase.User | null;

  constructor(
    private pasivoService : PasivoService,
    private titleService : Title,
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
          this.getTotal();

          //calcular categoria dominante
          this.getCategoriaDominante();
        });
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle('WasMo - Gastos variables');
  }

  ngDoCheck() {
    if(this.pasivo) {
      this.isLoaded = true;
    }
  }

  getTotal() {
    if(this.pasivo?.egresos) {
      let egresos : Egreso[] = this.pasivo.egresos;

      egresos.forEach(e => {
        if(e.total) {
          this.total += e.total;
        }
      })
    }
  }


  getCategoriaDominante() {
    if(this.pasivo?.egresos) {
      let egresos : Egreso[] = this.pasivo.egresos;
      let TotalCategorias : GastoPorCategoria[] = [];

      egresos.forEach(e => {

        let exist = false;

        //verifico si ya esta esa categoria
        if(TotalCategorias.length) {
          TotalCategorias.forEach(tc => {
            if(tc.categoria == e.categoria) {
              tc.gasto += e.total!;
              exist = true;
            }
          })
        }

        if(!exist) {
          let gastoPorCategoria : GastoPorCategoria = {
            categoria: e.categoria,
            gasto: e.total!
          }
          TotalCategorias.push(gastoPorCategoria);
        }
      })
      
      //porcentajes
      TotalCategorias.forEach(tc => {
        tc.porcentaje = tc.gasto/this.total;
      })

      //ordenar
      TotalCategorias.sort((a,b) => {
        return b.porcentaje! - a.porcentaje!;
      })

      this.categoriaDominante = TotalCategorias[0];
    }
  }

}
