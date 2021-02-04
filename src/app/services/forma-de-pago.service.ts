import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormaDePago } from '../models/FormaDePago.interface';


@Injectable({
  providedIn: 'root'
})
export class FormaDePagoService  {

  formasDePago: Observable<FormaDePago[]>;
  private formasDePagoCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.formasDePagoCollection = afs.collection<FormaDePago>('Formas de Pago');
    this.getFormasDePago();
  }

  saveFormaDePago(formaDePago : FormaDePago) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = formaDePago.nombre;
        const data = {id, ...formaDePago};
        console.log(data);
        const result = await this.formasDePagoCollection.doc(id).set(data);
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteFormaDePago(idFormaDePago : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.formasDePagoCollection.doc(idFormaDePago).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getFormasDePago(): void {
    this.formasDePago = this.formasDePagoCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as FormaDePago)));
  }
}
