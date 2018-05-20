import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { Component } from '@angular/core';
import { ListSingleComponent } from './pages/list/list-single/list-single.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfilComponent } from './pages/profil/profil.component';

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "list/view/:id", component: ListSingleComponent},
  { path: "contacts", component: ContactsComponent},
  { path: "profil", component: ProfilComponent},
  { path: "about", component: AboutComponent}
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  ListSingleComponent,
  AboutComponent,
  ProfilComponent,
  ContactsComponent
];
