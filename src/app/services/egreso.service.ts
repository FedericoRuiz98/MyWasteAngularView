import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Egreso } from '../models/Egreso.interface';


@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  egresos: Observable<Egreso[]>;
  private egresoCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.egresoCollection = afs.collection<Egreso>('Egresos');
    this.getEgresos();
  }

  saveEgreso(egreso : Egreso) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = this.afs.createId();
        const data = {id, ...egreso};
        console.log(data);
        const result = await this.egresoCollection.doc(id).set(data);
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteEgreso(idEgreso : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.egresoCollection.doc(idEgreso).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getEgresos(): void {
    this.egresos = this.egresoCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as Egreso)));
  }
 
}
