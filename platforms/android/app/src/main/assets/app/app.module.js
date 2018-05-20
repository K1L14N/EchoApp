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
var firebase = require("nativescript-plugin-firebase");
var echo_list_service_1 = require("./services/echo-list.service");
var user_service_1 = require("./services/user.service");
var geolocation_service_1 = require("./services/geolocation.service");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
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
                angular_1.NativeScriptUISideDrawerModule
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents, [
                time_ago_pipe_1.TimeAgoPipe
            ]),
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [echo_list_service_1.EchoListService, user_service_1.UserService, geolocation_service_1.GeolocationService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLCtDQUE0QztBQUU1QyxpREFBK0M7QUFDL0MsNkNBQThEO0FBRTlELHVEQUEwRDtBQUMxRCxrRUFBK0Q7QUFDL0Qsd0RBQXNEO0FBQ3RELHNFQUFtRTtBQUNuRSw4REFBbUY7QUFFbkYsUUFBUTtLQUNMLElBQUksQ0FBQztJQUNKLE9BQU8sRUFBRSxJQUFJO0lBQ2IsYUFBYSxFQUFFLDZCQUE2QjtDQUM3QyxDQUFDO0tBQ0QsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQXBDLENBQW9DLENBQUM7S0FDaEQsS0FBSyxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztBQW9CckQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQWxCckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7Z0JBQ3hDLHdDQUE4QjthQUMvQjtZQUNELFlBQVk7Z0JBQ1YsNEJBQVk7cUJBQ1QsbUNBQXFCO2dCQUN4QiwyQkFBVztjQUNaO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN6QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixTQUFTLEVBQUUsQ0FBQyxtQ0FBZSxFQUFFLDBCQUFXLEVBQUUsd0NBQWtCLENBQUM7U0FDOUQsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUaW1lQWdvUGlwZSB9IGZyb20gJ3RpbWUtYWdvLXBpcGUnO1xuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UnKTtcbmltcG9ydCB7IEVjaG9MaXN0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyJ1xuXG5maXJlYmFzZVxuICAuaW5pdCh7XG4gICAgcGVyc2lzdDogdHJ1ZSxcbiAgICBzdG9yYWdlQnVja2V0OiAnZ3M6Ly9lY2hvcHJvamV0LmFwcHNwb3QuY29tJ1xuICB9KVxuICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnRmlyZWJhc2UgaW5pdGlhbGlzZWQhJykpXG4gIC5jYXRjaCgoKSA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBmaXJlYmFzZSBpbml0JykpO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyksXG4gICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICAuLi5uYXZpZ2F0YWJsZUNvbXBvbmVudHMsXG4gICAgVGltZUFnb1BpcGVcbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxuICBwcm92aWRlcnM6IFtFY2hvTGlzdFNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBHZW9sb2NhdGlvblNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==