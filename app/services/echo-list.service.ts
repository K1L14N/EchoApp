import { Injectable, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Echo } from "../models/echo";
import firebaseWebApi = require('nativescript-plugin-firebase/app');
import { Subject } from 'rxjs/Subject';
import { GeolocationService } from './geolocation.service';
import * as geoLocation from "nativescript-geolocation";
import { Location } from "nativescript-geolocation";
import { Subscription } from 'rxjs/Subscription';
import firebase = require("nativescript-plugin-firebase");
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { UserService } from './user.service';
import { identity } from '../../platforms/android/app/src/main/assets/app/tns_modules/rxjs/src/util/identity';
var fs = require("file-system");
var appPath = fs.knownFolders.currentApp().path;

@Injectable()
export class EchoListService implements OnInit {

  echos: Echo[] = [];
  echosPortee : any = [];
  /* echosSubject = new Subject<Echo[]>();
  echosPorteeSubject = new Subject<Echo[]>(); */

  portee: number = 10000; // 10 kilomètres de portée


  constructor(
      private geolocationService: GeolocationService,
      private userService: UserService) {}

  ngOnInit() {
    this.geolocationService.updateLocation();
    firebaseWebApi.database().ref('/msg');
  }

  emitEchos() {
    //this.echosSubject.next(this.echos);
  }

  emitEchosPortee() {
    //this.echosPorteeSubject.next(this.echosPortee);
  }
  saveEchos() {
    firebaseWebApi.database().ref('/msg').set(this.echos);
  }

  getExpiredEcho() {
    return new Promise(
      (resolve, reject) => {
        let ids: Array<number> = [];
        let currentTime = Date.now();
        let timeout = 30000; //30 secondes
        if (firebaseWebApi.database().ref('/msg')) {
          firebaseWebApi.database().ref('/msg')
            .on('value', (data) => {
              if (data.val()) {
                let compteur = 0;
                data.val().forEach(element => {
                  /* console.log("current time : " + currentTime);
                  console.log("echo time : " + element.date);
                  console.log("différence : " + (currentTime - element.date)); */
                  if(element != null) {
                    if((currentTime - element.date > timeout)) {
                    console.log('Echo removed : ' + JSON.stringify(element));
                    ids.push(compteur);
                    }
                    compteur++;
                  }
                  
                });
                resolve(ids);
              }
            });
      }}
    );
  }

  removeExpiredEcho() {
    return new Promise(
      (resolve, reject) => {
        this.getExpiredEcho().then((ids) => {
          if (ids) {
            let idsToRemove = JSON.stringify(ids);
            let i = JSON.parse(idsToRemove);
            i.forEach(id => {
              firebaseWebApi.database().ref('/msg/' + id).remove()
                .then(() => {console.log('Remove succeeded');
                resolve();
              })
                .catch((error) => { console.log('Remove failed : ' + error);
                reject(error);
              })
            });
          }
        });
      }
    )
    
  }

  getEchos() {
    return new Promise(
      (resolve, reject) => {
        if (firebaseWebApi.database().ref('/msg')) {
          this.echosPortee = [];
          firebaseWebApi.database().ref('/msg')
            .on('value', (data) => {
              
              if (data.val() == null) { // pas de msg dans la DB
                this.echos = [];
                resolve(this.echos);
              } else { // msg dans la DB
                console.log('______________________');
                data.val().forEach(element => {
                  if (element) { // database non vide
                    // location de l'écho lorsqu'il a été émis
                    let msgLocation: Location = new Location();
                    msgLocation.latitude = element.latitude;
                    msgLocation.longitude = element.longitude;
                    this.geolocationService.getDeviceLocation().then(result => {
                      // location actuelle de l'utilisateur
                      let userLocation: Location = new Location();
                      userLocation.latitude = result.latitude;
                      userLocation.longitude = result.longitude;
                      // distance (Tel - Palo Alto : 943XXXX mètres)
                      let distance = geoLocation.distance(msgLocation, userLocation);
                      console.log('distance : ' + element.name + ' : ' + distance);
                      if (distance < this.portee) {
                        this.echosPortee.push(element);
                      }
                    }).then(() => {
                      this.emitEchosPortee();
                      resolve(this.echosPortee);
                    });
                  }
               });
              }
              if (data.val()) {
                this.echos = data.val();
              } else {
                this.echos = [];
              }
              //this.echos = data.val() ? data.val() : [];
              this.emitEchos();
            });
          }
      })
    
  }

  createNewEcho(newEcho: Echo) {
    this.echos.unshift(newEcho);
    this.saveEchos();
    /* this.emitEchos();
    this.emitEchosPortee(); */
  }

  getEcho(idEcho) {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.database().ref('/msg/' + idEcho).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  uploadFile(localPath: string) {
    return new Promise(
      (resolve, reject) => {
        let filename = this.userService.getUserId() + Date.now().toString();
        let remotePath = `${filename}`;
        return firebase.uploadFile({
          remoteFullPath: remotePath, // sur quel noeud de firebase je l'envoi
          localFullPath: localPath, // ou je cherche l'image
          onProgress: function(status) {
              console.log("Uploaded fraction: " + status.fractionCompleted);
              console.log("Percentage complete: " + status.percentageCompleted);
          }
        }).then(
          (uploadedFile) => {
            resolve(uploadedFile);
          }, (error) => {
            reject(error);
          }
        )
      }
    ) 
  }

}

