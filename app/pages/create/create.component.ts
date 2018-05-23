import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EchoListService } from '../../services/echo-list.service';
import { Echo } from '../../models/echo';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { GeolocationService } from '../../services/geolocation.service';
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { Location } from 'nativescript-geolocation';
import * as firebaseWebApi from 'nativescript-plugin-firebase';
import * as camera from "nativescript-camera";
import { Image } from "ui/image";
import * as dialogs from "ui/dialogs";
import * as enums from 'ui/enums';

@Component({
	selector: 'create',
	moduleId: module.id,
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
	providers: [ EchoListService ]
})

export class CreateComponent implements OnInit {

	locationSubscription: Subscription;
  currentLocation: Location;
	echo = "";
  @ViewChild("echoTextField") echoTextField: ElementRef;
	image: Image;
	imageSrc: string;
model:any;
	
	constructor(
		private echoListService: EchoListService,
		private geolocationService: GeolocationService,
		private page: Page,
		private router: Router) {
			
		 }

	ngOnInit() { 
		this.model  = "This is a texte";
		camera.requestPermissions();
	}

	add() {
		if (this.echo.trim() === "") {
		  alert("Entrez un echo");
		  return;
		}
		this.geolocationService.updateLocation();
		this.locationSubscription = this.geolocationService.locationSubject.subscribe(
			(location: Location) => {
			  this.currentLocation = location;
			}
		  );
		this.geolocationService.updateLocation();
		this.geolocationService.emitLocation();
	
		var newEcho = new Echo();
		newEcho.name = this.echo;
		newEcho.date = Date.now();
		newEcho.latitude = this.currentLocation.latitude;
		newEcho.longitude = this.currentLocation.longitude;

		if (this.imageSrc) { // image associé à l'ECHO
			this.echoListService.uploadFile(this.imageSrc)
			.then((urlPicture) => {
				newEcho.img = urlPicture;
				this.echoListService.getEchos().then(() => {
					this.echoListService.createNewEcho(newEcho);
					this.router.navigate(['/list']);
				});
			});
		} else { // ECHO sans image
			this.echoListService.getEchos().then(() => {
				this.echoListService.createNewEcho(newEcho);
				this.router.navigate(['/list']);
			});
		}
	}


	onTapDelete() {
		dialogs.confirm({
			title: "Vous allez perdre l'image",
			message: "Confirmer ?",
			okButtonText: "Oui",
			cancelButtonText: "Annuler"
		}).then(result => {
			// result argument is boolean
			console.log("Dialog result: " + result);
			if (result) { // je ne veux pas quitter
				this.image = null;
				this.imageSrc = null;
			}
		});
	}

	takePicture() {
		var options = {
			width: 500,
			keepAspectRatio: true,
			saveToGallery: true
		};
    camera.takePicture(options)
    .then((imageAsset) => {
        console.log("Result is an image asset instance");
        this.image = new Image();
				this.image.src = imageAsset;
				this.imageSrc = this.image.src._android;
				//console.log(this.imageSrc);
    }).catch((err) => {
        console.log("Error -> " + err.message);
    });
  }
}