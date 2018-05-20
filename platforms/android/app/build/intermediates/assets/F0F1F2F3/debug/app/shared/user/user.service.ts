import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";

import firebaseWebApi = require('nativescript-plugin-firebase/app');

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  createNewUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  signInUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  signOutUser() {
    firebaseWebApi.auth().signOut();
  }
  
}
