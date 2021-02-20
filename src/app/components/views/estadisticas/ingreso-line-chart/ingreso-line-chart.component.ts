import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Activo } from 'src/app/models/Activo.interface';
import { Ingreso } from 'src/app/models/Ingreso.interface';
import { ActivoService } from 'src/app/services/activo.service';
import { AuthService } from 'src/app/services/auth.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-ingreso-line-chart',
  templateUrl: './ingreso-line-chart.component.html',
  styleUrls: ['./ingreso-line-chart.component.scss']
})
export class IngresoLineChartComponent implements OnInit {

  desktop : boolean = true;
  ingresosPorMes : number[] = [];
  activos : Activo[] = [];
  activosUndefined : boolean = false;

  public lineChartData: ChartDataSets[] = [
    { data: this.ingresosPorMes, label: 'Ingresos' }   
  ];
  public chartColors: any[] = [
    {
      backgroundColor: 'rgba(0,255,128, 0.2)',
      borderColor: 'rgba(0,255,128, 0.2)',
      pointBackgroundColor: 'rgba(0,255,128, 0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,255,128, 0.2)'
    }
  ];
  
  public lineChartLabels: Label[] = [];
  
  public lineChartOptions: (ChartOptions & { annotation: any }) = {    
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{}]
    },
    annotation: {
      annotations: [
        {          
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  
  constructor(
    private deviceDetectorService : DeviceDetectorService,
    private activoService : ActivoService,
    private auth : AuthService) { 
    this.desktop = this.deviceDetectorService.isDesktop();

    //meses
    for (let i = 0; i < 12; i++) {
      let mes = DateUtilSpanish.monthToString(i);
      this.lineChartLabels.push(mes);
    }
  }

  ngOnInit(): void {

    this.auth.getCurrentUser().then(u => {

      if(u) {
        let todayDate = new Date();

        this.activoService.activos.subscribe(resp => {

          let activos = resp.filter(a => a.email == u.email && a.year == todayDate.getFullYear().toString());

          //hay activos para este año?
          if(activos.length) {     
            this.activos = activos   
            
            //recorro los activos y agrupos por mes los ingresos
            activos.forEach(a => {
              this.lineChartLabels.forEach(mes => {

                let totalMes = 0;
                a.ingresos?.forEach(i => {                  
                  let month = new Date(i.fecha.toMillis());
                  
                  if(DateUtilSpanish.monthToString(month.getMonth()) == mes) {
                    totalMes += i.monto;
                  }                                  
                });

                //cargar ingresos total del mes
                this.ingresosPorMes.push(totalMes);
              });         
            });   
          } else {
            this.activosUndefined = true;
          }
        });
      }
    });
  }

}
