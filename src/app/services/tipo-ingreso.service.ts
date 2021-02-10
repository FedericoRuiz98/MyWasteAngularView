import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoIngreso } from '../models/TipoIngreso.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoIngresoService {

  tiposIngreso: Observable<TipoIngreso[]>;
  private tiposIngresoCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.tiposIngresoCollection = afs.collection<TipoIngreso>('Tipo Ingreso');
    this.getTiposIngreso();
  }

  deleteTipoIngreso(idTipoIngreso : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.tiposIngresoCollection.doc(idTipoIngreso).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getTiposIngreso(): void {
    this.tiposIngreso = this.tiposIngresoCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as TipoIngreso)));
  }
}
