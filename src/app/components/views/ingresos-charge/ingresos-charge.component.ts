import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { Ingreso } from 'src/app/models/Ingreso.interface';
import { TipoIngreso } from 'src/app/models/TipoIngreso.interface';
import { ActivoService } from 'src/app/services/activo.service';
import { TipoIngresoService } from 'src/app/services/tipo-ingreso.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';
import { AuthService } from 'src/app/services/auth.service';
import { Activo } from 'src/app/models/Activo.interface';

@Component({
  selector: 'app-ingresos-charge',
  templateUrl: './ingresos-charge.component.html',
  styleUrls: ['./ingresos-charge.component.scss'],
  providers: [AuthService]
})
export class IngresosChargeComponent implements OnInit {

  desktop : boolean = true;
  tiposIngreso : Observable<TipoIngreso[]>;
  ingresos : any[] = [];

  //input fields
  concepto : string = "";
  monto : number = 0;
  tipoIngreso : string = "";
  currentDateString : string = new Date().toISOString().substring(0, 10);

  constructor(
    private titleService : Title,
    private deviceDetectorService : DeviceDetectorService,
    private serviceTipoIngreso : TipoIngresoService,
    private activoService : ActivoService,
    private auth : AuthService) { 
      this.desktop = this.deviceDetectorService.isDesktop();
    }

  ngOnInit(): void {
    this.titleService.setTitle('WasMo - Cargar Ingresos');    

    this.tiposIngreso = this.serviceTipoIngreso.tiposIngreso;

    this.tiposIngreso.subscribe(ti => {
      this.ingresos = ti;    
      this.ingresos.push({
        nombre : "Otros"
      })  
    })
  }

  tipoIngresoChange(value : string) {
    this.tipoIngreso = value;
    console.log(this.tipoIngreso);
  }

  generateIngreso() {
    let ingreso : Ingreso = {
      tipoIngreso : this.tipoIngreso,
      fecha : DateUtilSpanish.localDate(this.currentDateString),
      monto : this.monto,
      concepto : this.concepto,
      createDate : new Date()
    }

    this.auth.getCurrentUser().then(resp => {
      let usuario = resp;

      this.activoService.activos.pipe(take(1)).subscribe(resp => {
        let activo = resp.find(a => {
          return a.email == usuario?.email 
            && a.year == new Date().getFullYear().toString()
            && a.mes == DateUtilSpanish.monthToString(new Date().getMonth())
        });
  
        //meto el ingreso en un array
        let ingresos : Ingreso[] = [];
        ingresos.push(ingreso);
  
        if(!activo) {
          console.log('No hay activo previo');
          //si no existe el pasivo lo creo
          
          let activo : Activo = {
            email : usuario!.email!,
            mes : DateUtilSpanish.monthToString(new Date().getMonth()),
            year : new Date().getFullYear().toString(),
            ingresos : ingresos,            
          }
  
          //los guardo en Firebase 🔥
          this.activoService.saveActivo(activo);
  
        } else {
          console.log('Si hay activo previo');
  
          //agrego el egreso al pasivo
          activo.ingresos?.push(ingreso);
  
          //actualizo en Firebase 🔥
          this.activoService.saveActivo(activo,activo.id);
        }
  
      });
    });

  }
}
