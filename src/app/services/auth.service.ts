import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //public user: Observable<firebase.User>;

  constructor(public afauth: AngularFireAuth) {}

  async loginGoogle() {
    try {
      return await this.afauth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email: string, password: string) {
    //login
    try {      
      const result = await this.afauth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afauth.createUserWithEmailAndPassword(
        email,
        password
      ).then(resp => {
        resp.user?.sendEmailVerification();
      });
      
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout() {
    try {
      console.log("Logout");
      await this.afauth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async emailIsUsed(email : string) {
    try {
      return await this.afauth.fetchSignInMethodsForEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afauth.authState.pipe(first()).toPromise();
  }

  async loginWithEmail() {

    let actionCodeSettings = {
      url: 'http://localhost:4200/account-confirm',
      handleCodeInApp: true
    };

    const email = localStorage.getItem('email');
    console.log(email);

    if(email) {
      this.afauth.sendSignInLinkToEmail(email,actionCodeSettings);
    }
  }
}
