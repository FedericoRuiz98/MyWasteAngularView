import { Component, Input, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Gasto } from 'src/app/models/Gasto.interface';
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

  //flags
  isLoaded : boolean = true;

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
        })
      })

      //ordenar egresos
      this.egresos?.sort((a,b) => {
        return (b.fecha.seconds - a.fecha.seconds);
      });
    }
  }

  ngDoCheck() {
   
  }

  toggleGastos(index : number) : void {
    this.openTable[index] = !this.openTable[index];
  }

}
