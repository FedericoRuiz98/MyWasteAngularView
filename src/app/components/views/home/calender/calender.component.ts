import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; 
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Activo } from 'src/app/models/Activo.interface';
import { CurrencyCustomPipe } from 'src/app/pipes/currency-custom.pipe'
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [CurrencyCustomPipe]
})
export class CalenderComponent implements OnInit {

  desktop : boolean = true;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe : CurrencyPipe,
    private currencyCustomPipe : CurrencyCustomPipe,
    private deviceDetectorService : DeviceDetectorService) {
      this.desktop = this.deviceDetectorService.isDesktop();
     }

  ngOnInit(): void {

  }

  @Input() pasivo : Pasivo | undefined;
  @Input() activo : Activo | undefined;
  egresos : any[] = [];
  ingresos : any[] = [];
  events : any[] = [];

  calendarOptions: CalendarOptions;

  ngDoCheck() : void {
    if(this.pasivo && !this.calendarOptions) {
      
      this.pasivo.egresos?.forEach(e => {

        //hay egresos?
        if(this.egresos.length) {

          //busco si hay un gasto en esta fecha
          let event = this.egresos.find(ev => ev.date == this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd'));

          if(event) {
            let acum : number = e.total! +Number(event.title);
            event.title = acum!;
          } else {
            this.egresos.push({
              title: e.total!, date: this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd'), color: '#e74a3b'
            });
          } 
        } else {
          this.egresos.push({
            title: e.total!, date: this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd')!, color: '#e74a3b'
          });
        }              
      });

      this.activo?.ingresos?.forEach(e => {

        //hay ingresos?
        if(this.ingresos.length) {

          //busco si hay un ingreso en esta fecha
          let event = this.ingresos.find(ev => ev.date == this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd'));

          if(event) {
            let acum : number = e.monto! +Number(event.title);
            event.title = acum!;
          } else {
            this.ingresos.push({
              title: e.monto!, date: this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd'), color: '#28a745'
            });
          } 
        } else {
          this.ingresos.push({
            title: e.monto!, date: this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd')!, color: '#28a745'
          });
        }              
      });

      //currency pipe
      if(this.desktop) {
        this.egresos.forEach(e => {
          e.title = this.currencyPipe.transform(+e.title,'USD', 'symbol', '1.2-2');
        })
        this.ingresos.forEach(i => {
          i.title = this.currencyPipe.transform(+i.title,'USD', 'symbol', '1.2-2');
        })
      } else {
        this.egresos.forEach(e => {
          e.title = this.currencyCustomPipe.transform(+e.title);
        })
        this.ingresos.forEach(i => {
          i.title = this.currencyCustomPipe.transform(+i.title);
        })
      }
      

      //junto los ingresos y egresos
      this.events = this.egresos.concat(this.ingresos);

      //calendario
      this.calendarOptions = {
        locale: "es",
        plugins: [ bootstrapPlugin ],
        themeSystem: 'bootstrap',
        initialView: 'dayGridMonth',
        headerToolbar: {
          right: "prev,next"
        },        
        events: this.events
      };
    }
  }
  


}
