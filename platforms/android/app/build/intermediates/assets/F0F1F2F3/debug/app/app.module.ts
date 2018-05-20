import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

import firebase = require('nativescript-plugin-firebase');
import { EchoListService } from "./shared/echo/echo-list.service";
import { UserService } from "./shared/user/user.service";
import { GeolocationService } from "./services/geolocation.service"
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

firebase
  .init({
    persist: true,
    storageBucket: 'gs://echoprojet.appspot.com'
  })
  .then(() => console.log('Firebase initialised!'))
  .catch(() => console.error('Error firebase init'));

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptUISideDrawerModule
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents,
    TimeAgoPipe
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [EchoListService, UserService, GeolocationService]
})
export class AppModule { }
