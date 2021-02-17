import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { EgresoFijo } from 'src/app/models/EgresoFijo.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { GastoPorCategoria } from 'src/app/models/stadistics/gastoPorCategoria.interface';
import { UtilStats } from 'src/app/util/UtilStats';

@Component({
  selector: 'app-gastos-fijos-pie',
  templateUrl: './gastos-fijos-pie.component.html',
  styleUrls: ['./gastos-fijos-pie.component.scss']
})
export class GastosFijosPieComponent implements OnInit {

  @Input() pasivo : Pasivo;
  egresosFijos : EgresoFijo[] = [];
  total : number = 0;
  TotalCategorias : GastoPorCategoria[] = [];

  doughnutChartLabels: Label[] = [];
  doughnutChartData: number[] = [];
  doughnutChartType: ChartType = 'doughnut';
  
  constructor() { }

  ngOnInit(): void {
    if(this.pasivo?.egresosFijos) {
      
      this.egresosFijos = this.pasivo?.egresosFijos;

      this.TotalCategorias = UtilStats.promedioPorCategoria(this.egresosFijos);

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
