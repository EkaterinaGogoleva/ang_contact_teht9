/* Service on Angular-sovelluksen rakenneosa jonka tarkoituksena on tarjota
palveluita muille rakenneosille, yleensä komponenteille. Tämä
service välittää dataa palvelimelta Angular-sovellukseen ja toisinpäin.
*/

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from './contact';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

   
  
    constructor(private firestore: AngularFirestore) { }

  
//READ
    getContactsFromFs(): Observable<any> {
      return this.firestore.collection("contacts").snapshotChanges();}

    // CREATE
    //было newcontact: Contact
    postContactToFs(newcontact: any): Promise<any> {
      return this.firestore
      .collection("contacts")
      .add(newcontact).catch(error=>console.log(error))   
    }

  //UPDATE
  updateContact(data:any, id:any): Promise<any> {
    return this.firestore
    .collection("contacts")
    .doc(id) // oikea tietoa löydetään id:n avulla
    .update(data);
      }

    // DELETE
  deleteContact(data:any): Promise<any> {
return this.firestore
.collection("contacts")
.doc(data.id)
.delete();
  }
}
