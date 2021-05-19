import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contactform',
    templateUrl: './contactform.component.html',
    styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {

    //model: any = {};

    contacts: Contact[] = [];

    constructor(private contactService: ContactService, private router: Router) { 
    //haetaan kontaktit tähänkin komponenttiin että saadaan uudelle
    //kontaktille oikea id selville
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);

    }

    ngOnInit() {
    }

    onSubmit(formData: any, isFormValid: boolean | null) {
        console.log(formData);
        /*contactservicen postausmetodia käytetään. Subscribe -metodi
        pitää olla perässä jotta lähetys onnistuisi vaikka emme tässä
        tapauksessa "tilaa" mitään dataa jota observable toimittaisi.
        */
        if (isFormValid) { // lomakedata menee serverille vain jos isFormValid on true
        this.contactService.postContactToServer(
            {
                'id': this.contacts.length + 1,
                'name': formData.name,
                'email': formData.email
            }).subscribe();
            // käyttöliittymässä siirrytään listaan vasta kun
            // data on lähetetty serverille
            this.navigateToList()

        }
    }

    navigateToList() {
        // navigate vaatii reitin ympärille []
        this.router.navigate(['/']);

    }

}
