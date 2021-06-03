import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public aservice: AuthenticationService, private contactService: ContactService, public router: Router) { }

  ngOnInit() {
  }
  signOut() {
    this.aservice.signOut();
  }
}
