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
            ]),
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [echo_list_service_1.EchoListService, user_service_1.UserService, geolocation_service_1.GeolocationService, auth_guard_1.AuthGuard]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLCtDQUE0QztBQUU1QyxpREFBK0M7QUFDL0MsNkNBQThEO0FBQzlELDJDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsa0VBQStEO0FBQy9ELHdEQUFzRDtBQUN0RCxzRUFBbUU7QUFDbkUsOERBQW1GO0FBQ25GLG9FQUFrRTtBQUNsRSxzREFBdUU7QUFFdkUsUUFBUTtLQUNMLElBQUksQ0FBQztJQUNKLE9BQU8sRUFBRSxJQUFJO0lBQ2IsYUFBYSxFQUFFLDZCQUE2QjtDQUM3QyxDQUFDO0tBQ0QsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQXBDLENBQW9DLENBQUM7S0FDaEQsS0FBSyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztBQXNCckQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXBCckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7Z0JBQ3hDLHdDQUE4QjtnQkFDOUIsaUNBQXdCO2FBQ3pCO1lBQ0QsWUFBWTtnQkFDViw0QkFBWTtxQkFDVCxtQ0FBcUI7Z0JBQ3hCLDJCQUFXO2dCQUNYLGtDQUFlO2NBQ2hCO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixTQUFTLEVBQUUsQ0FBQyxtQ0FBZSxFQUFFLDBCQUFXLEVBQUUsd0NBQWtCLEVBQUUsc0JBQVMsQ0FBQztTQUN6RSxDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRpbWVBZ29QaXBlIH0gZnJvbSAndGltZS1hZ28tcGlwZSc7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IHJvdXRlcywgbmF2aWdhdGFibGVDb21wb25lbnRzIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vYXV0aC5ndWFyZCc7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlJyk7XG5pbXBvcnQgeyBFY2hvTGlzdFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIlxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhcidcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcblxuZmlyZWJhc2VcbiAgLmluaXQoe1xuICAgIHBlcnNpc3Q6IHRydWUsXG4gICAgc3RvcmFnZUJ1Y2tldDogJ2dzOi8vZWNob3Byb2pldC5hcHBzcG90LmNvbSdcbiAgfSlcbiAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0ZpcmViYXNlIGluaXRpYWxpc2VkIScpKVxuICAuY2F0Y2goKCkgPT4gY29uc29sZS5lcnJvcignRXJyb3IgZmlyZWJhc2UgaW5pdCcpKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLFxuICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50LFxuICAgIC4uLm5hdmlnYXRhYmxlQ29tcG9uZW50cyxcbiAgICBUaW1lQWdvUGlwZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gIF0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgcHJvdmlkZXJzOiBbRWNob0xpc3RTZXJ2aWNlLCBVc2VyU2VydmljZSwgR2VvbG9jYXRpb25TZXJ2aWNlLCBBdXRoR3VhcmRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==