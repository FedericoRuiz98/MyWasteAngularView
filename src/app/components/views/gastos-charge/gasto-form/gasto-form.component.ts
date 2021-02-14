import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { FormaDePago } from 'src/app/models/FormaDePago.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasivoService } from 'src/app/services/pasivo.service';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.scss'],
  providers: [AuthService],
})
export class GastoFormComponent implements OnInit {
  //Instancias
  formaDePago: FormaDePago | undefined;
  categoria: Categoria | undefined;
  egreso: Egreso;
  usuario: firebase.User | null;
  currentDateString: string = new Date().toISOString().substring(0, 10);

  //arrays
  categorias : Categoria[] = [];
  formasDePago : FormaDePago[] = [];

  //flags  
  catBool: boolean = false;
  formBool: boolean = false;
  chargeItems: boolean = false; //se puede empezar a cargar los items?
  desktop: boolean = true;
  fastCharge : boolean = false;

  //form inputs
  Concepto: string = '';
  interes: number = 0;
  cuotas: number = 1;
  total: number;

  //inputs
  @Input() categoriasOb: Observable<Categoria[]>;
  @Input() formasDePagoOb: Observable<FormaDePago[]>;

  //output
  @Output() egresoEmiter = new EventEmitter<Egreso>();
  @Output() categoriaEmiter = new EventEmitter<Categoria>();
  @Output() cargarItemsEmiter = new EventEmitter<boolean>();

  //invalid feedbacks
  categoriaFromsFeedback: string = '';

  constructor(
    private auth: AuthService,
    private deviceDetectorService : DeviceDetectorService,
    private pasivoService : PasivoService,
    private datePipe : DatePipe
  ) {
    this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {

    
  }

  ngDoCheck() {
    if(!this.categorias.length || !this.formasDePago.length) {
      this.categoriasOb.subscribe(resp => {
        this.categorias = resp;
      });
  
      this.formasDePagoOb.subscribe(resp => {
        this.formasDePago = resp;
      });
    }      
  }

  //selects
  formaDePagoChange(value: string) {
    this.formaDePago = this.formasDePago.find((f) => f.id == value);    
  }

  categoriaChange(value: string) {
    this.categoria = this.categorias.find((f) => f.id == value);    
  }

  private dejarCararItems(flag: boolean) {
    if (flag) {
      this.chargeItems = true;
    } else {
      this.chargeItems = false;
    }
  }

  private emitToFather() {
    this.egresoEmiter.emit(this.egreso);
    this.categoriaEmiter.emit(this.categoria);
    this.cargarItemsEmiter.emit(this.chargeItems);
  }

  generateEgreso(fast : boolean): void {
    let todayDate = new Date();
    this.auth.getCurrentUser().then(u => {
      let email = u?.email;

      if (this.categoria && this.formaDePago) {
        if (!this.formaDePago.cuotas) {
          this.categoriaFromsFeedback = '';
  
          if(fast) {
            this.fastCharge = true;
          } else {
            this.dejarCararItems(true);
          }
          
          //completar egerso
          this.egreso = {
            categoria: this.categoria?.categoria,
            email: email!.toLowerCase(),
            fecha: DateUtilSpanish.localDate(this.currentDateString),
            createDate : todayDate,
            concepto: this.Concepto.toLowerCase(),
            formaDepago: this.formaDePago.nombre,
          };
  
          //emitir
          this.emitToFather();
  
        } else {
          if (this.cuotas > 0) {
            this.categoriaFromsFeedback = '';
            
            if(fast) {
              this.fastCharge = true;
            } else {
              this.dejarCararItems(true);
            }
  
            //completar egerso
            this.egreso = {
              categoria: this.categoria?.categoria,
              email: email!.toLowerCase(),
              fecha: DateUtilSpanish.localDate(this.currentDateString),
              createDate : todayDate,
              concepto: this.Concepto,
              formaDepago: this.formaDePago.nombre,
              cuotas: this.cuotas,
              interes: this.interes,
            };
  
            //emitir
            this.emitToFather();
  
          } else {
            this.categoriaFromsFeedback = 'El campo Cuotas es obligatorios.';
          }
        }
      } else {
        this.categoriaFromsFeedback =
          'Los campos Categorias y Formas de Pago son obligatorios.';
      }
    });    
  }

  generateFastCharge() {
    this.generateEgreso(true);
  }

  saveGastos() {
    if(this.total > 0) {
      this.egreso.total = this.total;
      
      this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
        let pasivo = resp.find(p => {
          return p.email == this.egreso.email 
            && p.year == this.egreso.fecha.getFullYear().toString()
            && p.mes == DateUtilSpanish.monthToString(this.egreso.fecha.getMonth())
        });
  
        //meto el egreso en un array
        let egresos : Egreso[] = [];
        egresos.push(this.egreso);
  
        if(!pasivo) {
          console.log('No hay Pasivo previo');
          //si no existe el pasivo lo creo
          
          let pasivo : Pasivo = {
            email : this.egreso.email,
            mes : DateUtilSpanish.monthToString(this.egreso.fecha.getMonth()),
            year : this.egreso.fecha.getFullYear().toString(),
            egresos : egresos
          }
  
          //los guardo en Firebase 🔥
          this.pasivoService.savePasivo(pasivo);
  
        } else {
          console.log('Si hay Pasivo previo');
  
          //agrego el egreso al pasivo
          pasivo.egresos?.push(this.egreso);
  
          //actualizo en Firebase 🔥
          this.pasivoService.savePasivo(pasivo,pasivo.id);
        }
  
      });
    }
  }
}

