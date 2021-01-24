import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afauth: AngularFireAuth) { }

  async login(email:string, password:string) {
    try {
      const result = await this.afauth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }    
  }

  async register(email: string, password:string) {
    try {
      const result = await this.afauth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);      
    }    
  }

  async logout() {
    try {
      await this.afauth.signOut();
    } catch (error) {
      console.log(error);      
    }    
  }

  getCurrentUser() {
   return this.afauth.authState.pipe(first()).toPromise();
  }



}
