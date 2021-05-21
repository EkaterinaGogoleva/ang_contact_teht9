import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { AuthenticationService } from '../authentication.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';


@Component({
    selector: 'app-contactform',
    templateUrl: './contactform.component.html',
    styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
    email: string;
    password: string;

    constructor(public aservice: AuthenticationService, private contactService: ContactService, private router: Router) { 
   this.email = '';
   this.password = '';
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
        this.contactService.postContactToFs(
            {
                'name': formData.name,
                'email': formData.email
            }).then();
            // käyttöliittymässä siirrytään listaan vasta kun
            // data on lähetetty serverille
            this.navigateToList()

        }
    }

    navigateToList() {
        // navigate vaatii reitin ympärille []
        this.router.navigate(['/']);

    }
    signUp() {
        this.aservice.signUp(this.email, this.password);
        this.email = ''; 
        this.password = '';
      }
    
      signIn() {
        this.aservice.signIn(this.email, this.password);
        this.email = ''; 
        this.password = '';
      }
    
      signOut() {
        this.aservice.signOut();
      }
    

}
