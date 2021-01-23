import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SubCategoria } from '../models/SubCategoria';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService extends GlobalServiceService {

  constructor(private http : HttpClient) {
    super();
   }

  public getAllSubCategorias() : Observable<SubCategoria[]> {
    let url = this.baseurl+endsPoints.SubCategoria;
    const httpResp = this.http.get<SubCategoria[]>(url).pipe(shareReplay());
    this.debugResponse(httpResp,"Sub Categorias");
    return httpResp;
  }
}
