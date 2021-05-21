import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactformComponent } from './contactform/contactform.component';
import { ContactComponent } from './contact/contact.component';
import { SearchFilterPipe } from './searchFilter.pipe';
import { AngularFireAuthModule } from "@angular/fire/auth";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ContactlistComponent,
        ContactformComponent,
        ContactComponent,
        SearchFilterPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireAuthModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
  
      ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
