import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "../models/user";

import firebaseWebApi = require('nativescript-plugin-firebase/app');

@Injectable()
export class UserService {

  private _user: User = new User();

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
  
  initUser() {
    let user = firebaseWebApi.auth().currentUser;
    let now = new Date();
    //console.log(JSON.stringify(user));
    this._user.email = user.email;
    this._user.uid = user.uid;
    this._user.currentLogin = now;
    return new Promise(
      (resolve, reject) => {
        this.getLastLogin().then(() => { this.updateUserDB() });
      });
  }

  updateUserDB() {
    return new Promise(
      (resolve, reject) => {
          firebaseWebApi.database().ref('/user/' + this._user.uid).set(this._user)
          .then((data) => {
              resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
  }

  getLastLogin() {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.database().ref('/user/' + this._user.uid + '/currentLogin').once('value').then(
          (data) => {
            this._user.lastLogin = data.val();
            console.log(JSON.stringify(data.val()));
            
            resolve(data.val());
          }, (error) => {
            reject (error);
          }
        );
      }
    );
  }

  getUser() {
    return this._user;
  }

}
