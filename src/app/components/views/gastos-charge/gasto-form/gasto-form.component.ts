import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { FormaDePago } from 'src/app/models/FormaDePago';
import { AuthService } from 'src/app/services/auth.service';

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

  //flags
  isLoaded: boolean = false;
  catBool: boolean = false;
  formBool: boolean = false;
  chargeItems: boolean = false; //se puede empezar a cargar los items?
  desktop: boolean = true;

  //form inputs
  Concepto: string = '';
  interes: number = 0;
  cuotas: number = 1;

  //inputs
  @Input() categorias: Observable<Categoria[]>;
  @Input() formasDePago: Observable<FormaDePago[]>;

  //output
  @Output() egresoEmiter = new EventEmitter<Egreso>();
  @Output() categoriaEmiter = new EventEmitter<Categoria>();
  @Output() cargarItemsEmiter = new EventEmitter<boolean>();

  //invalid feedbacks
  categoriaFromsFeedback: string = '';

  constructor(
    private auth: AuthService,
    private deviceDetectorService : DeviceDetectorService
  ) {
    this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {}

  ngDoCheck() {
    //cargaron las categorias y las formas de pago?
    if (!this.isLoaded) {
      this.categorias.subscribe((resp) => {
        this.catBool = true;
      });
      this.formasDePago.subscribe((resp) => {
        this.formBool = true;
      });
      this.auth.getCurrentUser().then((resp) => {
        this.usuario = resp;
      });

      if (this.formBool && this.catBool) {
        this.isLoaded = true;
      }
    }
  }

  //selects
  formaDePagoChange(value: string) {
    this.formasDePago.subscribe((resp) => {
      this.formaDePago = resp.find((f) => f.id == value);
    });
  }

  categoriaChange(value: string) {
    this.categorias.subscribe((resp) => {
      this.categoria = resp.find((f) => f.id == value);
    });
    //this.categoria = CategoriaUtil.getCategoriaString(this.idCategoria);
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

  generateEgreso(): void {
    let todayDate = new Date();
    const email = this.usuario?.email;

    if (this.categoria && this.formaDePago && email) {
      if (!this.formaDePago.cuotas) {
        this.categoriaFromsFeedback = '';
        this.dejarCararItems(true);

        //completar egerso
        this.egreso = {
          categoria: this.categoria?.categoria,
          email: email.toLowerCase(),
          fecha: todayDate,
          concepto: this.Concepto.toLowerCase(),
          formaDepago: this.formaDePago.nombre,
        };

        //emitir
        this.emitToFather();

      } else {
        if (this.cuotas > 0) {
          this.categoriaFromsFeedback = '';
          this.dejarCararItems(true);

          //completar egerso
          this.egreso = {
            categoria: this.categoria?.categoria,
            email: email,
            fecha: todayDate,
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
  }
}
