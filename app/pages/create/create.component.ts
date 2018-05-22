import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EchoListService } from '../../services/echo-list.service';
import { Echo } from '../../models/echo';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { GeolocationService } from '../../services/geolocation.service';
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { Location } from 'nativescript-geolocation';

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

	constructor(
		private echoListService: EchoListService,
		private geolocationService: GeolocationService,
		private page: Page,
		private router: Router) { }

	ngOnInit() { }

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
		this.echoListService.getEchos().then(() => {
			this.echoListService.createNewEcho(newEcho);
			this.router.navigate(['/list']);
		});
	  }
}