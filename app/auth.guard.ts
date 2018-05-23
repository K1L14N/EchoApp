import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import firebaseWebApi = require('nativescript-plugin-firebase/app');
import { BackendService } from './services/backend.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (BackendService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
    }
}