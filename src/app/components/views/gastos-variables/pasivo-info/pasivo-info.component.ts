import { Component, Input, OnInit } from '@angular/core';
import { timestamp } from 'rxjs/operators';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import { GastoService } from 'src/app/services/gasto.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-pasivo-info',
  templateUrl: './pasivo-info.component.html',
  styleUrls: ['./pasivo-info.component.scss']
})
export class PasivoInfoComponent implements OnInit {

  todayDate = new Date();
  
  //flags
  isLoaded : boolean = false;
  iconsReady : boolean = false;

  //arrays
  egresos : Egreso[] | undefined = [];
  openTable : boolean[] = [];

  //input
  @Input() pasivo : Pasivo;

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    if(this.pasivo) {
      this.egresos = this.pasivo.egresos;

      //traer icono
      this.egresos?.forEach(e => {
        this.categoriaService.categorias.subscribe(categoria => {
          //buscar categoria
          let cat = categoria.find(c => c.categoria == e.categoria);
          e.icon = cat?.icon;
          this.iconsReady = true;
        })
      })
      

      //ordenar egresos
      this.egresos?.sort((a,b) => {

        //ordeno por fecha de cracion, en caso contrario por fecha de gasto
        if(a.createDate && b.createDate) {
          return (b.createDate.seconds - a.createDate.seconds);
        } else if(a.createDate) {
          return (b.fecha.seconds - a.createDate.seconds);
        } else if(b.createDate) {
          return (b.createDate.seconds - a.fecha.seconds);
        } else {
          return (b.fecha.seconds - a.fecha.seconds);
        }
        
      });

      
    }
  }

  ngDoCheck() {
   if(this.egresos!.length && this.iconsReady) {
     this.isLoaded = true;
   }
  }

  toggleGastos(index : number) : void {
    this.openTable[index] = !this.openTable[index];
  }

}
