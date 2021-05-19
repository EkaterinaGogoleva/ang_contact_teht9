import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactformComponent } from './contactform/contactform.component';

// Reittioliot taulukossa
const routes: Routes = [
{path: '', redirectTo: '/list', pathMatch: 'full'},
{path: 'list', component: ContactlistComponent},
{path: 'form', component: ContactformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
