import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { flatMap, map, shareReplay, switchMap } from 'rxjs/operators';
import { Pasivo } from '../models/Pasivo.interface';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class PasivoService{
  
  pasivos: Observable<Pasivo[]>;
  private pasivoCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.pasivoCollection = afs.collection<Pasivo>('Pasivos');
    this.getPasivos();
  }

  savePasivo(pasivo : Pasivo,idPasivo? : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = idPasivo || this.afs.createId();
        const data = {id, ...pasivo};
        const result = await this.pasivoCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  deletePasivo(idPasivo : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.pasivoCollection.doc(idPasivo).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getPasivos(): void {
    this.pasivos = this.pasivoCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as Pasivo)));
  }


}
