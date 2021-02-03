import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gasto } from '../models/Gasto.interface';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  gastos: Observable<Gasto[]>;
  private gastoCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.gastoCollection = afs.collection<Gasto>('Gastos');
    this.getGastos();
  }

  saveGasto(gasto : Gasto) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = this.afs.createId();
        const data = {id, ...gasto};
        console.log(data);
        const result = await this.gastoCollection.doc(id).set(data);
        console.log(result);
        resolve(result);
      } catch (error) {
        console.log(error);
      }
    });
  }

  deleteGasto() {}

  getGastos(): void {
    this.gastos = this.gastoCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as Gasto)));
  }
}
