import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseurl = endsPoints.api;
  private url = this.baseurl+endsPoints.Usuario;

  constructor(private http : HttpClient) { }

  public login(email : string) : Observable<any> {
    const httpResp = this.http.post<any>(this.url+"/login?email="+email,email);
    return httpResp;
  }

}
