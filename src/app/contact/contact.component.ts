import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    @Input() c: Contact;

  constructor() { 
    this.c = {id: 0, name: "", email: ""};
  }

  ngOnInit() {
  }

}
