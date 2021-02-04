import { Component, OnInit } from '@angular/core';
import { Egreso } from 'src/app/models/Egreso.interface';
import { Persona } from 'src/app/models/auth/Persona';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EgresoService } from 'src/app/services/egreso.service';
import { PersonaService } from 'src/app/services/persona.service';
import { GastoService } from 'src/app/services/gasto.service';
import { Gasto } from 'src/app/models/Gasto.interface';
import { Categoria } from 'src/app/models/Categoria.interface';
import { SubCategoria } from 'src/app/models/SubCategoria.interface';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import { FormaDePago } from 'src/app/models/FormaDePago.interface';
import { Pasivo } from 'src/app/models/Pasivo.interface';
import { Console } from 'console';
import { PasivoService } from 'src/app/services/pasivo.service';

@Component({
  selector: 'app-test-btn',
  templateUrl: './test-btn.component.html',
  styleUrls: ['./test-btn.component.scss']
})
export class TestBtnComponent implements OnInit {

  categorias = this.categoriaService.categorias;
  constructor(private service : EgresoService,private categoriaService : CategoriaService, private formaService : FormaDePagoService,private pasivoService : PasivoService) { }

  ngOnInit(): void {
    this.addGasto();
  }

  public addGasto() {
    //var per = new Persona("Nicolas","Ruiz");

    const gastos : Gasto[] = [
      {
        concepto: 'coca',
        monto: 120,
        subCategoria : 'bebida'
      },
      {
        concepto: 'fruta',
        monto: 400,
        subCategoria : 'comida'
      },
      {
        concepto: '',
        monto: 120,
        subCategoria : 'otros'
      },
    ]

    const egreso : Egreso[] = [{
      categoria : 'Supermercado',
      formaDepago : 'efectivo',
      fecha : new Date(),
      email : 'federicofruiz@hotmail.com',
      gastos : gastos
    }]

    let pasivo : Pasivo = {
      mes : 'febrero',
      year : '2020',
      email : 'federicofruiz@hotmail.com',
      egresos : egreso
    }


    //console.log(pasivo);
    //let p = this.pasivoService.getOnePasivo('federicofruiz@hotmail.com')
    //console.log('test',p);
    //this.pasivoService.savePasivo(pasivo)

    //this.service.saveEgreso(egreso);

    /*const subCategorias: SubCategoria[] = [
      {
        nombre : 'Tecnologia'
      },
      {
        nombre : 'Hogar'
      },
      {
        nombre : 'Regalo'
      },
      {
        nombre : 'Farmacia'
      },
      {
        nombre : 'Libreria'
      },
      {
        nombre : 'Ferreteria'
      },
      {
        nombre : 'Vestimenta'
      },
      {
        nombre : 'Otros'
      }
    ]

    const categoria : Categoria = {
      categoria : 'Shoping',
      subCategorias : subCategorias
    }

    this.categoriaService.saveCategoria(categoria);*/

    /*const formaDePago : FormaDePago[] = [
      {
      nombre : 'Contado',
      interes : false,
      cuotas : false,
      },
      {
        nombre : 'Debito',
        interes : false,
        cuotas : false,
      },
      {
        nombre : 'Credito',
        interes : true,
        cuotas : true,
      },
      {
        nombre : 'Transferencia',
        interes : false,
        cuotas : false,
      }
    ]

    formaDePago.forEach(e => {
      this.formaService.saveFormaDePago(e);
    })*/


  }

}
