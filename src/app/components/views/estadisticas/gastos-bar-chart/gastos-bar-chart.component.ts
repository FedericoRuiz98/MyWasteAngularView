import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Activo } from 'src/app/models/Activo.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-gastos-bar-chart',
  templateUrl: './gastos-bar-chart.component.html',
  styleUrls: ['./gastos-bar-chart.component.scss'],
})
export class GastosBarChartComponent implements OnInit {
  pasivos: Pasivo[];
  pasivoUndefined: boolean = false;
  gastosVariableMensual: number[] = [];
  gastosFijoMensual: number[] = [];
  year = new Date().getFullYear().toString();
  desktop: boolean = true;

  public barChartOptions: ChartOptions = {
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.gastosVariableMensual, label: 'Gasto variable' },
    { data: this.gastosFijoMensual, label: 'Gasto Fijo' },
  ];

  constructor(
    private pasivoService: PasivoService,
    private auth: AuthService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.desktop = this.deviceDetectorService.isDesktop();

    //meses
    for (let i = 0; i < 12; i++) {
      let mes = DateUtilSpanish.monthToString(i);
      this.barChartLabels.push(mes);
    }
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().then((u) => {
      if (u) {
        let email = u.email;

        //traer todos los pasivos del usuario
        this.pasivoService.pasivos.subscribe((resp) => {
          let pasivos = resp.filter(
            (p) => p.email == email && p.year == this.year
          );

          if (pasivos) {
            this.pasivos = pasivos;

            //meses
            this.barChartLabels.forEach((mes) => {
              this.pasivos.forEach((p) => {
                //gastos variables
                let totalMes = 0;
                if (p.egresos && p.mes == mes) {
                  p.egresos.forEach((e) => {
                    totalMes += e.total!;
                  });
                }
                this.gastosVariableMensual.push(totalMes);

                //gasto fijo
                let totalMesFijo = 0;
                if (p.egresosFijos && p.mes == mes) {
                  p.egresosFijos.forEach((e) => {
                    totalMesFijo += e.monto!;
                  });
                }
                this.gastosFijoMensual.push(totalMesFijo);
              });
            });
          } else {
            this.pasivoUndefined = true;
          }
        });
      }
    });
  }
}
