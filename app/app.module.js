"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var time_ago_pipe_1 = require("time-ago-pipe");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var auth_guard_1 = require("./auth.guard");
var firebase = require("nativescript-plugin-firebase");
var echo_list_service_1 = require("./services/echo-list.service");
var user_service_1 = require("./services/user.service");
var geolocation_service_1 = require("./services/geolocation.service");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var header_component_1 = require("./pages/header/header.component");
var common_1 = require("nativescript-angular/common");
var create_component_1 = require("./pages/create/create.component");
var backend_service_1 = require("./services/backend.service");
firebase
    .init({
    persist: true,
    storageBucket: 'gs://echoprojet.appspot.com'
})
    .then(function () { return console.log('Firebase initialised!'); })
    .catch(function () { return console.error('Error firebase init'); });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
                angular_1.NativeScriptUISideDrawerModule,
                common_1.NativeScriptCommonModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents, [
                time_ago_pipe_1.TimeAgoPipe,
                header_component_1.HeaderComponent,
                create_component_1.CreateComponent
            ]),
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [echo_list_service_1.EchoListService, user_service_1.UserService, geolocation_service_1.GeolocationService, auth_guard_1.AuthGuard, backend_service_1.BackendService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLCtDQUE0QztBQUU1QyxpREFBK0M7QUFDL0MsNkNBQThEO0FBQzlELDJDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsa0VBQStEO0FBQy9ELHdEQUFzRDtBQUN0RCxzRUFBbUU7QUFDbkUsOERBQW1GO0FBQ25GLG9FQUFrRTtBQUNsRSxzREFBdUU7QUFDdkUsb0VBQWtFO0FBQ2xFLDhEQUE0RDtBQUU1RCxRQUFRO0tBQ0wsSUFBSSxDQUFDO0lBQ0osT0FBTyxFQUFFLElBQUk7SUFDYixhQUFhLEVBQUUsNkJBQTZCO0NBQzdDLENBQUM7S0FDRCxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztLQUNoRCxLQUFLLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO0FBdUJyRDtJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBckJyQixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1Asd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLDZCQUFzQjtnQkFDdEIsaUNBQXdCO2dCQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztnQkFDeEMsd0NBQThCO2dCQUM5QixpQ0FBd0I7YUFDekI7WUFDRCxZQUFZO2dCQUNWLDRCQUFZO3FCQUNULG1DQUFxQjtnQkFDeEIsMkJBQVc7Z0JBQ1gsa0NBQWU7Z0JBQ2Ysa0NBQWU7Y0FDaEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLFNBQVMsRUFBRSxDQUFDLG1DQUFlLEVBQUUsMEJBQVcsRUFBRSx3Q0FBa0IsRUFBRSxzQkFBUyxFQUFFLGdDQUFjLENBQUM7U0FDekYsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJ3RpbWUtYWdvLXBpcGUnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2F1dGguZ3VhcmQnO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZWNoby1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlXCJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXInXG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9iYWNrZW5kLnNlcnZpY2UnO1xuXG5maXJlYmFzZVxuICAuaW5pdCh7XG4gICAgcGVyc2lzdDogdHJ1ZSxcbiAgICBzdG9yYWdlQnVja2V0OiAnZ3M6Ly9lY2hvcHJvamV0LmFwcHNwb3QuY29tJ1xuICB9KVxuICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnRmlyZWJhc2UgaW5pdGlhbGlzZWQhJykpXG4gIC5jYXRjaCgoKSA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBmaXJlYmFzZSBpbml0JykpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyksXG4gICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzLFxuICAgIFRpbWVBZ29QaXBlLFxuICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICBDcmVhdGVDb21wb25lbnRcbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxuICBwcm92aWRlcnM6IFtFY2hvTGlzdFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBHZW9sb2NhdGlvblNlcnZpY2UsIEF1dGhHdWFyZCwgQmFja2VuZFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==