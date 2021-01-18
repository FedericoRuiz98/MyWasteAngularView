import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { FormaDePago } from '../models/FormaDePago';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class FormaDePagoService extends GlobalServiceService {

  constructor(private http : HttpClient) {
    super();
  }

  public getAllFormasDePago() : Observable<FormaDePago[]> {
    this.url = this.baseurl+endsPoints.FormaDePago;
    const httpResp = this.http.get<FormaDePago[]>(this.url).pipe(shareReplay());
    this.debugResponse(httpResp,"Forma de Pago");
    return httpResp;
  }
}
