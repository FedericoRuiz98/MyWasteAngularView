import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
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
  pasivoUndefined : boolean = false;
  todayDate : Date = new Date();
  mes : string = DateUtilSpanish.monthToString(this.todayDate.getMonth());
  total : number = 0;
  isLoaded : boolean = false;
  categoriaDominante : GastoPorCategoria;  

  usuario: firebase.User | null;
  desktop : boolean = true;

  constructor(
    private pasivoService : PasivoService,
    private titleService : Title,
    private auth: AuthService,
    private deviceDetectorService : DeviceDetectorService) { 
      this.desktop = this.deviceDetectorService.isDesktop();

      //traigo al usuario
      this.auth.getCurrentUser().then(resp => {
        this.usuario = resp;        

        //traigo los pasivos de este mes y usuario
        this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
          let pasivo = resp.find(p => {
            return p.email == this.usuario?.email 
              && p.year == this.todayDate.getFullYear().toString()
              && p.mes == DateUtilSpanish.monthToString(this.todayDate.getMonth())
          })

          if(pasivo) {
            this.pasivo = pasivo;

            //hay egresos?            
            if(this.pasivo.egresos) {
              //calcular total
              this.getTotal();

              //calcular categoria dominante
              this.getCategoriaDominante();
            } else {
              this.pasivoUndefined = true;
            }             
          } else {
            this.pasivoUndefined = true;
          }          
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
