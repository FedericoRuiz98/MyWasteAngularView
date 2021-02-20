import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activo } from '../models/Activo.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  activos: Observable<Activo[]>;
  private activosCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.activosCollection = afs.collection<Activo>('Activos');
    this.getActivos();
  }

  saveActivo(activo : Activo,idActivo? : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        //armar id
        const nick = activo.email.split('@')[0];
        const date = activo.mes+"-"+activo.year;        
        const id = idActivo || nick+"-"+date+":"+this.afs.createId();

        //info
        const data = {id, ...activo};
        console.log(data);
        const result = await this.activosCollection.doc(id).set(data);
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteActivo(idActivo : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.activosCollection.doc(idActivo).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getActivos(): void {
    this.activos = this.activosCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as Activo)));
  }
}
