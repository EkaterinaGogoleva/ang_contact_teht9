import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<any>;

  constructor(private afauth: AngularFireAuth) {
    this.userData = afauth.authState;
  }

  /* Регистрация
  Sign up */
  signUp(email: string, password: string) {
    this.afauth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  /* 
  Вход по логину и паролю
  Sign in */
  signIn(email: string, password: string) {
    this.afauth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  /* Выход 
  Sign out */
  signOut() {
    this.afauth
      .signOut();
  }  

}