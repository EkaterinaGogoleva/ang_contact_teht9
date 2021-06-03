import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { AuthenticationService } from '../authentication.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';



@Component({
    selector: 'app-contactform',
    templateUrl: './contactform.component.html',
    styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contacts: Array<Contact> = [];
    email: string;
    password: string;
    uploadPercent: Observable<number | undefined> = new Observable;
    downloadURL: Observable<string> = new Observable;
    addnew = true;
    saveedited= false;
  formname: string;
  formid: string;
  formemail: string;
  

    constructor(private storage: AngularFireStorage, public aservice: AuthenticationService, private contactService: ContactService, private router: Router) { 
   this.email = '';
   this.password = '';
   this.formname='';
   this.formid='';
   this.formemail='';
   
    }

    ngOnInit() {
      //cама добавила
      this.getContacts();
    };
    getContacts(): void {
      //tilataan subscribe-metodilla observable servicen getContacts-metodista
      //subscribien argumenttina on callback jolla kontaktitaulukko saadaan
      this.contactService.getContactsFromFs()
        .subscribe((contacts: any)=>{
          //firestoren palauttamaa  contacts haetaan näin:
          console.log(contacts[0].payload.doc.data().name);
          //tyhjennetaan luokan kontakttotaulukko vanhastacntacts[i]sta
 //ennen kuin haetaan
 this.contacts= [];
 for (let i=0; i <contacts.length; i++) {
   this.contacts.push ( {
     id: contacts[i].payload.doc.id,  name: contacts[i].payload.doc.data().name,
     email: contacts[i].payload.doc.data().email
   });
 }
 this.contacts.sort((a, b)=>(a.name >b.name)? 1: -1);
         })
        }
      

    onSubmit(formvalue: any, isFormValid: boolean | null) {
        console.log(formvalue);
        /*contactservicen postausmetodia käytetään. Subscribe -metodi
        pitää olla perässä jotta lähetys onnistuisi vaikka emme tässä
        tapauksessa "tilaa" mitään dataa jota observable toimittaisi.
        */
        if (isFormValid) { // lomakedata menee serverille vain jos isFormValid on true
  
          //lomakecontacts[i] menee serverille vain jos isFormValid on true
          //LISÄTÄÄN
          if (this.addnew === true) {
            this.contactService.postContactToFs(
              {
                'name': formvalue.formname,
                'email': formvalue.formemail
              }). then();
              this.formname ='';
              this.formemail='';
              //käyttäliittymässä siirrytään listaan vasta kun
              //contacts[i] on lähetetty serverille
              //this.navigateToList()
          }
          //MUOKATAAN
          if (this.saveedited === true) {
            this.contactService.updateContact({
              'name': formvalue.formname,
              'email': formvalue.formemail
            }, this.formid);
            //this getStudents() nollataan asetukset
            this.addnew=true;
            this.saveedited=false;
            this.formname='';
            this.formemail= '';
          }
        }
        /*
          this.contactService.postContactToFs(
            { 'id': formdata.id,
                'name': formData.name,
                'email': formData.email
            }).then();
            // käyttöliittymässä siirrytään listaan vasta kun
            // data on lähetetty serverille
            this.navigateToList()

        }*/
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
    
     
    //метод, который сохраняет контакты в файле
    
 
  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); //lataus storageen tapahtuu tässä

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

  // deletoidaan kontaktti ja haetaan ja pushataan uusi lista
  deletec(c: any) {
    console.log(c);
    this.contactService.deleteContact(c);
  }
  // lomakkeen update -metodi joka asettaa
  // lomekkeelle arvot joita voidaan muokata
  updatec(c: Contact) {
    console.log('updatec')
    this.formid = c.id;
    this.formname = c.name;
    this.formemail = c.email;

    this.addnew = false;
    this.saveedited = true;
  }


}
