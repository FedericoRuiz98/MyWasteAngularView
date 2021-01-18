import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Categoria } from '../models/Categoria';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GlobalServiceService {

  constructor(private http : HttpClient) {
    super();
  }

  public getAllCategorias() : Observable<Categoria[]> {
    this.url = this.baseurl+endsPoints.Categoria;
    const httpResp = this.http.get<Categoria[]>(this.url).pipe(shareReplay());
    this.debugResponse(httpResp,"Categoria");
    return httpResp;
  }
}
