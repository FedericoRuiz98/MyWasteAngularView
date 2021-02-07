import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; 
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private currencyPipe : CurrencyPipe) { }

  ngOnInit(): void {

  }

  @Input() pasivo : Pasivo | undefined;
  events : any[] = [];

  calendarOptions: CalendarOptions;

  ngDoCheck() : void {
    if(this.pasivo && !this.calendarOptions) {
      
      this.pasivo.egresos?.forEach(e => {

        //hay eventos?
        if(this.events.length) {

          //busco si hay un gasto en esta fecha
          let event = this.events.find(ev => ev.date == this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd'));

          if(event) {
            let acum : number = e.total! +Number(event.title);
            event.title = acum!;
          } else {
            this.events.push({
              title: e.total!, date: this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd'), color: '#e74a3b'
            });
          } 
        } else {
          this.events.push({
            title: e.total!, date: this.datePipe.transform(e.fecha.toMillis(),'yyyy-MM-dd')!, color: '#e74a3b'
          });
        }              
      });

      this.events.forEach(e => {
        e.title = this.currencyPipe.transform(+e.title,'USD', 'symbol', '1.2-2');
      })


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
