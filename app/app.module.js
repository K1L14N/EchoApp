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
            providers: [echo_list_service_1.EchoListService, user_service_1.UserService, geolocation_service_1.GeolocationService, auth_guard_1.AuthGuard]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLCtDQUE0QztBQUU1QyxpREFBK0M7QUFDL0MsNkNBQThEO0FBQzlELDJDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsa0VBQStEO0FBQy9ELHdEQUFzRDtBQUN0RCxzRUFBbUU7QUFDbkUsOERBQW1GO0FBQ25GLG9FQUFrRTtBQUNsRSxzREFBdUU7QUFDdkUsb0VBQWtFO0FBRWxFLFFBQVE7S0FDTCxJQUFJLENBQUM7SUFDSixPQUFPLEVBQUUsSUFBSTtJQUNiLGFBQWEsRUFBRSw2QkFBNkI7Q0FDN0MsQ0FBQztLQUNELElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDO0tBQ2hELEtBQUssQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7QUF1QnJEO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFyQnJCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCx3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjtnQkFDdkIsNkJBQXNCO2dCQUN0QixpQ0FBd0I7Z0JBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO2dCQUN4Qyx3Q0FBOEI7Z0JBQzlCLGlDQUF3QjthQUN6QjtZQUNELFlBQVk7Z0JBQ1YsNEJBQVk7cUJBQ1QsbUNBQXFCO2dCQUN4QiwyQkFBVztnQkFDWCxrQ0FBZTtnQkFDZixrQ0FBZTtjQUNoQjtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsU0FBUyxFQUFFLENBQUMsbUNBQWUsRUFBRSwwQkFBVyxFQUFFLHdDQUFrQixFQUFFLHNCQUFTLENBQUM7U0FDekUsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJ3RpbWUtYWdvLXBpcGUnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2F1dGguZ3VhcmQnO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZScpO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZWNoby1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlXCJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXInXG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50JztcblxuZmlyZWJhc2VcbiAgLmluaXQoe1xuICAgIHBlcnNpc3Q6IHRydWUsXG4gICAgc3RvcmFnZUJ1Y2tldDogJ2dzOi8vZWNob3Byb2pldC5hcHBzcG90LmNvbSdcbiAgfSlcbiAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0ZpcmViYXNlIGluaXRpYWxpc2VkIScpKVxuICAuY2F0Y2goKCkgPT4gY29uc29sZS5lcnJvcignRXJyb3IgZmlyZWJhc2UgaW5pdCcpKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLFxuICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIC4uLm5hdmlnYXRhYmxlQ29tcG9uZW50cyxcbiAgICBUaW1lQWdvUGlwZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgQ3JlYXRlQ29tcG9uZW50XG4gIF0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgcHJvdmlkZXJzOiBbRWNob0xpc3RTZXJ2aWNlLCBVc2VyU2VydmljZSwgR2VvbG9jYXRpb25TZXJ2aWNlLCBBdXRoR3VhcmRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==