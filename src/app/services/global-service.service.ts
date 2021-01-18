import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

export class GlobalServiceService {

  protected readonly baseurl = endsPoints.api;
  protected url = this.baseurl;

  constructor() { }

  protected debugResponse(httpResp : Observable<any>,title : string) {
    HttpConsoleResponse.printResponse(httpResp,title);
  }


}
