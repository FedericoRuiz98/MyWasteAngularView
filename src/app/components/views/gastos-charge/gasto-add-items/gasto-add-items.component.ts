import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Categoria } from 'src/app/models/Categoria.interface';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Gasto } from 'src/app/models/Gasto.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { PasivoService } from 'src/app/services/pasivo.service';
import { CategoriaUtil } from 'src/app/util/CategoriaUtil';
import { DateUtilSpanish } from 'src/app/util/DateUtilSpanish';
import { UtilInteres } from 'src/app/util/UtilInteres';
import { PasivoInfoComponent } from '../../gastos-variables/pasivo-info/pasivo-info.component';

@Component({
  selector: 'app-gasto-add-items',
  templateUrl: './gasto-add-items.component.html',
  styleUrls: ['./gasto-add-items.component.scss'],
  providers: [PasivoService]
})
export class GastoAddItemsComponent implements OnInit {
  
  //input form
  subCategoria : string;
  monto : string = "";
  concepto : string ="";
  total : number = 0;

  //flag
  desktop : boolean = true;

  //input
  @Input() egreso : Egreso;
  @Input() categoria : Categoria;
  @Input() chargeItems : boolean;

  //array
  gastos : Gasto[] = [];  
  categoriaIcons : string[] = CategoriaUtil.getAllCategoriaIcon(); 
  
  //invalid feedbacks
  gastosFormsFeedback : string = "";
  
  constructor(
    private pasivoService : PasivoService,
    private deviceDetectorService : DeviceDetectorService) { 
    this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {}

  private cleanForm() : void {
    this.monto = "";
    this.concepto = ""; 
    this.subCategoria = "";
  }

  addGasto() {
    if(this.categoria) {

      //check input fields
      if(+this.monto != 0 && this.subCategoria != "") {
        //clean invalid feedback
        this.gastosFormsFeedback = "";

        const gasto : Gasto = {
          subCategoria : this.subCategoria,
          monto : +this.monto,
          concepto : this.concepto.toLowerCase(),
        }

        //pusheo lista de gastos y sumo el total
        this.gastos.push(gasto);
        this.total += +this.monto;

        //clean form
        this.cleanForm();        
      } else {
        this.gastosFormsFeedback = "Los campos sub categoria y monto son obligatorios";
      }            
    }    
  }  

  deleteGasto(index : number) : void {
    this.gastos.splice(index,1);
  }

  //Guardar en firebase
  saveGastos() : void {
    //Completar egreso
    this.egreso.gastos = this.gastos;
    this.egreso.total = this.total;

    this.savePasivo();    
  }

  deleteForm() {
    this.gastos = [];
    this.cleanForm();
  }

  private savePasivo() {

    this.pasivoService.pasivos.pipe(take(1)).subscribe(resp => {
 
      //cuotas?
      if(+this.egreso!.cuotas! >= 1) {
        //calcular cuotas
        let cuotas = UtilInteres.getCuotas(+this.egreso.total!,+this.egreso.cuotas!,+this.egreso.interes!);                        

        for (let i = 0; i < this.egreso!.cuotas!; i++) {                     
          this.egreso.total = Math.round(cuotas[i]);          
          this.createPasivo(resp,i);          
        }        
      } else {
        this.createPasivo(resp);  
      }

    });
  }

  private createPasivo(resp : Pasivo[],cuota? : number) {
    this.pasivoService.pasivos.pipe(take(1)).subscribe(async resp => {

      //fecha dependiendo la cuota que sea
      if(cuota) {
        //Registrar primer cuota este mes
        if(cuota > 0) {
          this.egreso.fecha.setMonth(this.egreso.fecha.getMonth() + 1);
        }
      }       

      //buscar el pasivo de la fecha
      let pasivo = resp.find(p => {
        return p.email == this.egreso.email 
          && p.year == this.egreso.fecha.getFullYear().toString()
          && p.mes == DateUtilSpanish.monthToString(this.egreso.fecha.getMonth())
      });

      //meto el egreso en un array
      let egresos : Egreso[] = [];
      egresos.push(this.egreso);

      if(!pasivo) {        
        
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

        //hay egresos variables?
        if(pasivo.egresos) {
          //agrego el egreso al pasivo
          pasivo.egresos?.push(this.egreso);
        } else {
          //meto el egreso en un array
          let egresos : Egreso[] = [];
          egresos.push(this.egreso);

          pasivo.egresos = egresos;
        }        

        //actualizo en Firebase 🔥
        this.pasivoService.savePasivo(pasivo,pasivo.id);
      }

    });
  }
}
