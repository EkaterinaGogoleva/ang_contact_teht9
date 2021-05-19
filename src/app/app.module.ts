import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactformComponent } from './contactform/contactform.component';
import { ContactComponent } from './contact/contact.component';
import { SearchFilterPipe } from './searchFilter.pipe';

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
        FormsModule,
        ReactiveFormsModule,
        /* HttpClientInMemoryWebApiModule on feikkiserverin moduuli
           joka pitää ottaa pois käytöstä kun vaihdetaan oikeaan serveriin */
  
      ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
