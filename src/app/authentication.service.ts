import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<any>;

  constructor(private afauth: AngularFireAuth) {
    this.userData = afauth.authState;
  }
   // Sign in with Google
   GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  
/*регистрация с помощью фейсбука
  FaceAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }  
*/
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afauth.signInWithPopup(provider)
    .then((result:any) => {
        console.log('You have been successfully logged in!')
    }).catch((error:any) => {
        console.log(error)
    })
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