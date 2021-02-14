import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoGastoFijo } from '../models/TipoGastoFijo.interface';

@Injectable({
  providedIn: 'root'
})
export class TiposGastosFijosService {

  tiposGastoFijo: Observable<TipoGastoFijo[]>;
  private tiposGastoFijoCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.tiposGastoFijoCollection = afs.collection<TipoGastoFijo>('Gastos Fijos');
    this.getTiposGastoFijo();
  }

  deleteTipoGastoFijo(idTipoIngreso : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.tiposGastoFijoCollection.doc(idTipoIngreso).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getTiposGastoFijo(): void {
    this.tiposGastoFijo = this.tiposGastoFijoCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as TipoGastoFijo)));
  }
}
