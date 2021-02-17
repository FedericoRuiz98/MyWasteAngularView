import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Activo } from 'src/app/models/Activo.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { EgresoFijo } from 'src/app/models/EgresoFijo.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { GastoPorCategoria } from 'src/app/models/stadistics/gastoPorCategoria.interface';
import { UtilStats } from 'src/app/util/UtilStats';

@Component({
  selector: 'app-gastos-variables-pie',
  templateUrl: './gastos-variables-pie.component.html',
  styleUrls: ['./gastos-variables-pie.component.scss']
})
export class GastosVariablesPieComponent implements OnInit {

  @Input() pasivo : Pasivo;
  egresos : Egreso[] = [];
  total : number = 0;
  TotalCategorias : GastoPorCategoria[] = [];

  doughnutChartLabels: Label[] = [];
  doughnutChartData: number[] = [];
  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    if(this.pasivo?.egresos) {
      
      this.egresos = this.pasivo?.egresos;

      this.TotalCategorias = UtilStats.promedioPorCategoria(this.egresos);

      //datasets
      this.TotalCategorias.forEach(tc => {
        let porcentaje = Math.round(tc.porcentaje! * 100);
        this.doughnutChartData.push(porcentaje);
      });

      //labels
      this.TotalCategorias.forEach(tc => {
        this.doughnutChartLabels.push(tc.categoria);
      });
    }
  }

}
