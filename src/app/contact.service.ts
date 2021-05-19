/* Service on Angular-sovelluksen rakenneosa jonka tarkoituksena on tarjota
palveluita muille rakenneosille, yleensä komponenteille. Tämä
service välittää dataa palvelimelta Angular-sovellukseen ja toisinpäin.
*/

import { Injectable } from '@angular/core';

import { Contact } from './contact';

/* Palvelimelta haettu data toimitetaan komponentille observablena
   Angular on reaktiivinen sovelluskehys joka käyttää observableja
   datan siirtämiseen paikasta toiseen. */
   import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

   
  
  
  
    // Tuodaan HttpClient -olio sisään serviceen konstruktorin kautta
  // olion nimi on http.
    constructor() { }

    /* getContacts() palauttaa Observablen.
  HttpClient -olion get-metodilla haetaan Observable
  annetusta osoitteesta. Observablen tyyppi on taulukko jossa on
  Contact -tyyppisiä olioita.

  Observable on "tarkkailtava" eli olio joka 'pushaa' datastreamia.
  Vastaanottaja tilaa 'streamin'.
  */

    getContactsFromFs(): Observable<Contact[]> {

        
    }
    // lähetetään uusi kontakti serverille. Samalla palautetaan 
    // sama lähetetty data ja jos palvelimella on tehty siihen jokin
    // muutos, niin se palautuu muutettuna, esim. generoitu id 
    postContactToFs(newcontact: Contact): Promise<any> {

    return; 
    }
}
