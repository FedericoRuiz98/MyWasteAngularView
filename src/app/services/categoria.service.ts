import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/Categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categorias: Observable<Categoria[]>;
  private categoriaCollection: AngularFirestoreCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.categoriaCollection = afs.collection<Categoria>('Categorias');
    this.getCategorias();
  }

  saveCategoria(categoria : Categoria) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = categoria.categoria;
        const data = {id, ...categoria};
        console.log(data);
        const result = await this.categoriaCollection.doc(id).set(data);
        console.log(result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteCategoria(idCategoria : string) : Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const resp = await this.categoriaCollection.doc(idCategoria).delete();
      } catch (error) {
        reject(error);
      }
    })
  }

  getCategorias(): void {
    this.categorias = this.categoriaCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data() as Categoria)));
  }
}
