import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { take } from 'rxjs/operators';
import { Egreso } from 'src/app/models/Egreso.interface';
import { EgresoFijo } from 'src/app/models/EgresoFijo.interface';
import { FormaDePago } from 'src/app/models/FormaDePago.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { TiposGastosFijosService } from 'src/app/services/tipos-gastos-fijos.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-gatos-fijos-charge',
  templateUrl: './gatos-fijos-charge.component.html',
  styleUrls: ['./gatos-fijos-charge.component.scss']
})
export class GatosFijosChargeComponent implements OnInit {

  desktop : boolean = true;
  gastosFijos : any[] = [];
  formasDePago : FormaDePago[] = [];

  //input fields
  concepto : string = "";
  monto : number = 0;
  tipoGastoFijo : string = "";
  formaDePago : FormaDePago | undefined;
  cuotas : number = 1;
  interes : number = 0;
  currentDateString : string = new Date().toISOString().substring(0, 10);

  constructor(
    private deviceDetectorService : DeviceDetectorService,
    private serviceFormasDePago : FormaDePagoService,
    private serviceGastosFijos : TiposGastosFijosService,
    private auth : AuthService,
    private pasivoService : PasivoService) {
    this.desktop = this.deviceDetectorService.isDesktop();
   }

  ngOnInit(): void {
    //traer tipos de gastos fijos
    this.serviceGastosFijos.tiposGastoFijo.subscribe(resp => {
      this.gastosFijos = resp;      
      this.gastosFijos.push({
        nombre : "Otros"
      })
    });

    //traer formas de pago
    this.serviceFormasDePago.formasDePago.subscribe(resp => {
      this.formasDePago = resp;      
    })
  }

  tipoEgresoChange(value : string) {
    this.tipoGastoFijo = value;    
  }

  formaDePagoChange(value : string) {
    this.formaDePago = this.formasDePago.find((f) => f.id == value);        
  }

  generateEgresoFijo() {
    
    //crear egreso
    let egresoFijo : EgresoFijo = {
      concepto : this.concepto,
      createDate : new Date(),
      fecha : this.currentDateString,
      monto : this.monto,
      categoria : this.tipoGastoFijo,

      //formas de pago
      cuotas : this.cuotas,
      interes : this.interes,
      formaDepago : this.formaDePago!.nombre

    }

    this.auth.getCurrentUser().then(u => {
      let email = u?.email;

      if(email) {
        this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
          let todayDate = new Date();
          let pasivo = resp.find(p => {
            return p.email == email
              && p.year == todayDate.getFullYear().toString()
              && p.mes == DateUtilSpanish.monthToString(todayDate.getMonth())
          });

          //hay pasivo este mes
          if(pasivo) {
            console.log("hay pasivos");

            if(pasivo.egresosFijos?.length) {
              pasivo.egresosFijos!.push(egresoFijo);
            } else {
              //creo array de gastos fijos
              let gastosFijos : EgresoFijo[] = [];
              gastosFijos.push(egresoFijo);

              pasivo.egresosFijos = gastosFijos;
            }
            
            this.pasivoService.savePasivo(pasivo,pasivo.id);

          } else {
            console.log("No hay pasivos");

            //creo array de gastos fijos
            let gastosFijos : EgresoFijo[] = [];
            gastosFijos.push(egresoFijo);

            let pasivo : Pasivo = {
              email : email!,
              mes : DateUtilSpanish.monthToString(todayDate.getMonth()),
              year : todayDate.getFullYear().toString(),
              egresosFijos : gastosFijos
            }

            this.pasivoService.savePasivo(pasivo);
          }
        });        
      }
    })
  }

}
