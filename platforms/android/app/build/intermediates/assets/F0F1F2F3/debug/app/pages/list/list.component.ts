import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef  } from "@angular/core";
import { Echo } from "../../shared/echo/echo";
import { EchoListService } from "../../shared/echo/echo-list.service";
import { TextField } from "ui/text-field";
import { Subscription } from 'rxjs/Subscription';
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { GeolocationService } from "../../services/geolocation.service";
import { Location } from 'nativescript-geolocation';
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"]
})

export class ListComponent implements OnInit, OnDestroy, AfterViewInit {

  locationSubscription: Subscription;
  currentLocation: Location;

  echoList: Echo[] = [];
  echoListPortee: Echo[] = [];

  echoSubscription: Subscription;
  echoPorteeSubscription: Subscription;

  echo = "";
  @ViewChild("echoTextField") echoTextField: ElementRef;

  private mainContentText: string;
  private drawer: RadSideDrawer;
 
  @ViewChild("#sidedrawerId") public drawerComponent: RadSideDrawerComponent;
  
  constructor(private echoListService: EchoListService,
              private page: Page,
              private router: Router,
              private geolocationService: GeolocationService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";

    // en cas d'update de Location
    this.locationSubscription = this.geolocationService.locationSubject.subscribe(
      (location: Location) => {
        this.currentLocation = location;
      }
    );
    this.geolocationService.updateLocation();
    this.geolocationService.emitLocation();

    // en cas d'update de echo dans la portée
    this.echoPorteeSubscription = this.echoListService.echosPorteeSubject.subscribe(
      (echosPortee: Echo[]) => {
        this.echoListPortee = echosPortee;
      });
    // fire la méthode 'next' ie initialise this.echoListPortee ...
    this.echoListService.emitEchosPortee();

    // permet de souscrire au Subject ie. être informé de toute modification
    this.echoSubscription = this.echoListService.echosSubject.subscribe(
      (echos: Echo[]) => {
        this.echoList = echos;
      });
    // fire la méthode 'next' ie initialise this.echoList ...
    this.echoListService.emitEchos();

    // charge les echos
    this.echoListService.getEchos();
  }

  onViewEcho(idEcho) {
    this.router.navigate(['/list', 'view', idEcho]);
  }

  add() {
    this.geolocationService.updateLocation();

    if (this.echo.trim() === "") {
      alert("Entrez un echo");
      return;
    }
  
    // Dismiss the keyboard
    let textField = <TextField>this.echoTextField.nativeElement;
    textField.dismissSoftInput();

    var newEcho = new Echo();
    newEcho.name = this.echo;
    newEcho.date = Date.now();
    newEcho.latitude = this.currentLocation.latitude;
    newEcho.longitude = this.currentLocation.longitude;
    this.echoListService.createNewEcho(newEcho);
  }
  
  ngOnDestroy() {
    this.echoSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
    this.echoPorteeSubscription.unsubscribe();
  }

  //args: observable.EventData
  onShowDrawerTap() {
    console.log("Drawer method reached");
      this.drawer.showDrawer();
  }

  onCloseDrawerTap() {
      console.log("Close reached");
      this.drawer.closeDrawer();
  }
}
