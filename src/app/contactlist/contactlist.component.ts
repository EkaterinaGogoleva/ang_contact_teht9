import { Component, OnInit } from '@angular/core';
//import {mockcontacts} from '../mock-contacts';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-contactlist',
    templateUrl: './contactlist.component.html',
    styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {

    contacts: Contact[] = [];//tänne laitetaan data
    nameFilter: FormControl = new FormControl(); // nameFilter -muuttuja on tyypiltään FormControl -olio ja Observable
    filterCriteria: string = ""; // hakuarvo jonka perusteella listaa filtteröidään
    field: string;
    fields: string[];


    // Service otetaan käyttöön konstruktorin argumenttina (dependency injection)
    constructor(private contactService: ContactService) {
        this.field = 'name'; // oletushakukenttä
        this.fields = ['name', 'email']; // hakukentät templaatissa

        // tilataan subscribe-metodilla observable servicen getContacts -metodista
        // subscriben argumenttina on callback jolla kontaktitaulukko saadaan
        //this.contactService.getContacts()
        //.subscribe((contacts) => this.contacts = contacts);

     /* filtteröinti on reaktiivinen eli tehdään RxJS:llä.
     nameFilter on observable joka lähettää käyttäjän syötteen streamina.
     Joka kerta kun hakulomakkeella arvo muuttuu, emitoidaan valueChanges
     -event joka tuottaa observable -streamin joka tilataan. Subscribe -metodi
     laukaisee anonyymin funktion joka palauttaa filterCriterian jonka
     perusteella kontaktilistaa filtteröidään.
  */
    this.nameFilter.valueChanges // tämä on observable
    .pipe(debounceTime(100)) // debounceTime on viive merkkien syöttämisen välissä
    .subscribe( // streamin tilaus, subscribella on kaksi anonyymia funktiota parametrina. Eka laukaistaan jos homma onnistuu
      value => this.filterCriteria = value,
      error => console.error(error));

    }

    _getContacts(): void {
        // tilataan subscribe-metodilla observable servicen getContacts -metodista
        // subscriben argumenttina on callback jolla kontaktitaulukko saadaan
        this.contactService.getContactsFromFs()
            .subscribe((contacts: any) => {
              //firestoren palauttamaa dataa haetaan näin:
              console.log(contacts[0].payload.doc.data().name);
              //tyhjennetään luokan kontaktitaulukko vanhasta datasta ennen kuin haetaan ussi data
              this.contacts = [];
              for (let i=0; i< contacts.length; i++){
                this.contacts.push({name: contacts[i].payload.doc.data().name,
                  email: contacts[i].payload.doc.data().email });
              }
              //сортируем в алфавитном порядке
            this.contacts.sort((a, b)=>(a.name > b.name)? 1: -1); 
            }
            )
    }
  

    ngOnInit() {
        //suoritetaan kun komponentti otetaan käyttöön
        this._getContacts();


    }

    // suoritetaan kun lomakkeen select -valintaa vaihdetaan
  onSelect(target: any) {
    console.log(target);
    this.field = target; // vaihdetaan oletushakukenttä
  }

}
