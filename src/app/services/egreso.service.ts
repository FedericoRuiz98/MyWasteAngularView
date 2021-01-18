import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Egreso } from '../models/Egreso';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class EgresoService extends GlobalServiceService {

  url = this.baseurl+endsPoints.Egreso;

  constructor(private http : HttpClient) {
    super();
  }

  public getAllEgresos() : Observable<Egreso[]> {
    const httpResp = this.http.get<Egreso[]>(this.url).pipe(shareReplay());
    this.debugResponse(httpResp,"Egreso");
    return httpResp;
  }

  public getEgresosByEmail(email : string) : Observable<Egreso[]> {
    const httpResp = this.http.get<Egreso[]>(this.url+"/byEmail/"+email).pipe(shareReplay());
    this.debugResponse(httpResp,"Egreso");
    return httpResp;
  }

  public getEgresoById(id : number) : Observable<Egreso[]> {
    const httpResp = this.http.get<Egreso[]>(this.url+"/byId/"+id).pipe(shareReplay());
    this.debugResponse(httpResp,"Egreso");
    return httpResp;
  }

  public createEgreso(egreso : Egreso) : Observable<Egreso> {
    const httpResp = this.http.post<Egreso>(this.url, {
      "mes": egreso.mes,
      "email": egreso.email,
      "year": egreso.year,
      "total": egreso.total
    }).pipe(shareReplay());

    this.debugResponse(httpResp,"Egreso");
    return httpResp;
  }

  public getEgresosByEmailAndDate(email : string,mes : string,year : string) : Observable<Egreso[]> {
    const httpResp = this.http.get<Egreso[]>(this.url+"/byEmail/date/"+email+"&"+mes+"&"+year).pipe(shareReplay());
    this.debugResponse(httpResp,"Egreso");
    return httpResp;
  }
}
