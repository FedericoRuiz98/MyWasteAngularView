import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CategoriaSubCategorias } from '../models/categoriaSubCategorias';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaSubCategoriaService extends GlobalServiceService {


  constructor(private http : HttpClient) {
    super();
  }

  public getAllCategoriasRelation() : Observable<CategoriaSubCategorias[]> {
    this.url = this.baseurl+endsPoints.CategoriaSubCategoria;
    const httpResp = this.http.get<CategoriaSubCategorias[]>(this.url).pipe(shareReplay());
    this.debugResponse(httpResp,"Categorias - Sub Categorias");
    return httpResp;
  }
}
