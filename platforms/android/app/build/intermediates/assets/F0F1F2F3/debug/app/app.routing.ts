import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { Component } from '@angular/core';
import { ListSingleComponent } from './pages/list/list-single/list-single.component';

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "list/view/:id", component: ListSingleComponent},
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  ListSingleComponent,
];
