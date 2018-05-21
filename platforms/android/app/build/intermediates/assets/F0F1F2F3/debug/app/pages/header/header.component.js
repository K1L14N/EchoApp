"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var application = require("application");
var application_1 = require("application");
var platform_1 = require("platform");
var dialogs = require("ui/dialogs");
var router_2 = require("nativescript-angular/router");
var frameModule = require('ui/frame');
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService, router, routerExtensions, changeDetectorRef) {
        this.userService = userService;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.changeDetectorRef = changeDetectorRef;
        this.sidedrawerOn = false;
        this.activity = application.android.startActivity ||
            application.android.foregroundActivity ||
            frameModule.topmost().android.currentActivity ||
            frameModule.topmost().android.activity;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!platform_1.isAndroid) {
            return;
        }
        else {
            application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
                if (_this.router.isActive('/login', true)) {
                    //console.log('0');
                }
                else if (_this.router.isActive('/list', true)) {
                    //console.log('1');
                    data.cancel = true;
                    dialogs.confirm({
                        title: "Confirmation",
                        message: "Voulez-vous vraiment quitter Echo ?",
                        okButtonText: "Oui",
                        cancelButtonText: "Annuler"
                    }).then(function (result) {
                        // result argument is boolean
                        console.log("Dialog result: " + result);
                        if (!result) {
                            data.cancel = true;
                        }
                        else {
                            data.cancel = false;
                            _this.activity.finish();
                        }
                    });
                }
                else if (_this.router.isActive('/contacts', true)) {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'slide',
                            duration: 1000,
                            curve: 'linear'
                        } });
                    //console.log('3');					
                }
                else if (_this.router.isActive('/profil', true)) {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'flipLeft',
                            duration: 1000,
                            curve: 'linear'
                        } });
                    //console.log('4');					
                }
                else if (_this.router.isActive('/about', true)) {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'flip',
                            duration: 1000,
                            curve: 'linear'
                        } });
                    //console.log('5');					
                }
                else {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'fade',
                            duration: 1000,
                            curve: 'linear'
                        } });
                    //console.log('2');	
                }
            });
        }
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectorRef.detectChanges();
    };
    HeaderComponent.prototype.toggleDrawer = function () {
        if (this.sidedrawerOn) {
            this.onCloseDrawerTap();
        }
        else {
            this.onShowDrawerTap();
        }
    };
    //args: observable.EventData
    HeaderComponent.prototype.onShowDrawerTap = function () {
        //console.log("Drawer method reached");
        this.drawer.showDrawer();
        this.sidedrawerOn = !this.sidedrawerOn;
    };
    HeaderComponent.prototype.onCloseDrawerTap = function () {
        //console.log("Close reached");
        this.drawer.closeDrawer();
        this.sidedrawerOn = !this.sidedrawerOn;
    };
    HeaderComponent.prototype.onTapActu = function () {
        this.router.navigate(['/list']);
        this.onCloseDrawerTap();
    };
    HeaderComponent.prototype.onTapContacts = function () {
        this.router.navigate(['/contacts']);
        this.onCloseDrawerTap();
    };
    HeaderComponent.prototype.onTapProfil = function () {
        this.router.navigate(['/profil']);
        this.onCloseDrawerTap();
    };
    HeaderComponent.prototype.onTapAbout = function () {
        this.router.navigate(['/about']);
        this.onCloseDrawerTap();
    };
    HeaderComponent.prototype.onTapLogout = function () {
        var _this = this;
        dialogs.confirm({
            title: "Déconnection en cours",
            message: "Voulez-vous vraiment vous déconnecter ?",
            okButtonText: "Oui",
            cancelButtonText: "Annuler"
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result) {
                _this.userService.signOutUser();
                _this.router.navigate(['/']);
                _this.onCloseDrawerTap();
            }
        });
    };
    __decorate([
        core_1.ViewChild("sidedrawerId"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HeaderComponent.prototype, "drawerComponent", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router,
            router_2.RouterExtensions,
            core_1.ChangeDetectorRef])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0YsOERBQTRGO0FBRTVGLDBDQUF5QztBQUN6Qyw0REFBMEQ7QUFDMUQseUNBQTJDO0FBQzNDLDJDQUFzRjtBQUN0RixxQ0FBcUM7QUFDckMsb0NBQXNDO0FBRXRDLHNEQUErRDtBQUUvRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFTdEM7SUFVQyx5QkFDUyxXQUF3QixFQUN4QixNQUFjLEVBQ2QsZ0JBQWtDLEVBQ2xDLGlCQUFvQztRQUhwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBYjdDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBSTlCLGFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWE7WUFDNUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0I7WUFDdEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlO1lBQzdDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBTVUsQ0FBQztJQUVsRCxrQ0FBUSxHQUFSO1FBQUEsaUJBNERDO1FBM0RBLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztnQkFDN0csRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFR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UyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDckMsQ0FBQzt5Q0FhcUIsMEJBQVc7WUFDaEIsZUFBTTtZQUNJLHlCQUFnQjtZQUNmLHdCQUFpQjtPQWRqQyxlQUFlLENBNEkzQjtJQUFELHNCQUFDO0NBQUEsQUE1SUQsSUE0SUM7QUE1SVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSAndWkvZW51bXMnO1xudmFyIGZyYW1lTW9kdWxlID0gcmVxdWlyZSgndWkvZnJhbWUnKTtcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnaGVhZGVyJyxcblx0dGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2hlYWRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXHRzaWRlZHJhd2VyT246IEJvb2xlYW4gPSBmYWxzZTtcblx0ZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuXHRAVmlld0NoaWxkKFwic2lkZWRyYXdlcklkXCIpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG5cblx0YWN0aXZpdHkgPSBhcHBsaWNhdGlvbi5hbmRyb2lkLnN0YXJ0QWN0aXZpdHkgfHxcblx0YXBwbGljYXRpb24uYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHkgfHxcblx0ZnJhbWVNb2R1bGUudG9wbW9zdCgpLmFuZHJvaWQuY3VycmVudEFjdGl2aXR5IHx8XG5cdGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5hbmRyb2lkLmFjdGl2aXR5O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuXHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAoIWlzQW5kcm9pZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9sb2dpbicsIHRydWUpKSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnMCcpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKCcvbGlzdCcsIHRydWUpKSB7IC8vIHBhZ2UgZCdhY2N1ZWlsXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnMScpO1xuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGRpYWxvZ3MuY29uZmlybSh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkNvbmZpcm1hdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlOiBcIlZvdWxlei12b3VzIHZyYWltZW50IHF1aXR0ZXIgRWNobyA/XCIsXG5cdFx0XHRcdFx0XHRcdG9rQnV0dG9uVGV4dDogXCJPdWlcIixcblx0XHRcdFx0XHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJBbm51bGVyXCJcblx0XHRcdFx0XHRcdH0pLnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdGlmICghcmVzdWx0KSB7IC8vIGplIG5lIHZldXggcGFzIHF1aXR0ZXJcblx0XHRcdFx0XHRcdFx0XHRkYXRhLmNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIGplIHZldXggcXVpdHRlclxuXHRcdFx0XHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hY3Rpdml0eS5maW5pc2goKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9jb250YWN0cycsIHRydWUpKSB7XG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9saXN0J10sIHsgdHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiAnc2xpZGUnLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdFx0Y3VydmU6ICdsaW5lYXInXG5cdFx0XHRcdFx0fX0pO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzMnKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9wcm9maWwnLCB0cnVlKSkge1xuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvbGlzdCddLCB7IHRyYW5zaXRpb246IHtcblx0XHRcdFx0XHRcdG5hbWU6ICdmbGlwTGVmdCcsXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiAnbGluZWFyJ1xuXHRcdFx0XHR9fSk7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnNCcpO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZSgnL2Fib3V0JywgdHJ1ZSkpIHtcblx0XHRcdFx0XHRkYXRhLmNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2xpc3QnXSwgeyB0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRuYW1lOiAnZmxpcCcsXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiAnbGluZWFyJ1xuXHRcdFx0XHR9fSk7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnNScpO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIHsgLy9saXN0L3ZpZXcvOmlkXG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9saXN0J10sIHsgdHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0bmFtZTogJ2ZhZGUnLFxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IDEwMDAsXG5cdFx0XHRcdFx0XHRjdXJ2ZTogJ2xpbmVhcidcblx0XHRcdFx0fX0pO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzInKTtcdFxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuXHRcdHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXHR9XG5cblx0dG9nZ2xlRHJhd2VyKCkge1xuXHRcdGlmICh0aGlzLnNpZGVkcmF3ZXJPbikge1xuXHRcdCAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG5cdFx0fSBlbHNlIHtcblx0XHQgIHRoaXMub25TaG93RHJhd2VyVGFwKCk7XG5cdFx0fVxuXHR9XG5cdFxuXHQgIC8vYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGFcblx0ICBvblNob3dEcmF3ZXJUYXAoKSB7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIkRyYXdlciBtZXRob2QgcmVhY2hlZFwiKTtcblx0XHR0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG5cdFx0dGhpcy5zaWRlZHJhd2VyT24gPSAhdGhpcy5zaWRlZHJhd2VyT247XG5cdCAgfVxuXHRcblx0ICBvbkNsb3NlRHJhd2VyVGFwKCkge1xuXHRcdC8vY29uc29sZS5sb2coXCJDbG9zZSByZWFjaGVkXCIpO1xuXHRcdHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG5cdFx0dGhpcy5zaWRlZHJhd2VyT24gPSAhdGhpcy5zaWRlZHJhd2VyT247XG5cdCAgfVxuXHRcblx0ICBvblRhcEFjdHUoKSB7XG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCddKTtcblx0XHR0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcblx0ICB9XG5cdFxuXHQgIG9uVGFwQ29udGFjdHMoKSB7XG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY29udGFjdHMnXSk7XG5cdFx0dGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG5cdCAgfVxuXHRcblx0ICBvblRhcFByb2ZpbCgpIHtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWwnXSk7XG5cdFx0dGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG5cdCAgfVxuXHRcblx0ICBvblRhcEFib3V0KCkge1xuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Fib3V0J10pO1xuXHRcdHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuXHQgIH1cblx0XG5cdCAgb25UYXBMb2dvdXQoKSB7XG5cdFx0ZGlhbG9ncy5jb25maXJtKHtcblx0XHRcdHRpdGxlOiBcIkTDqWNvbm5lY3Rpb24gZW4gY291cnNcIixcblx0XHRcdG1lc3NhZ2U6IFwiVm91bGV6LXZvdXMgdnJhaW1lbnQgdm91cyBkw6ljb25uZWN0ZXIgP1wiLFxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk91aVwiLFxuXHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJBbm51bGVyXCJcblx0XHR9KS50aGVuKHJlc3VsdCA9PiB7XG5cdFx0ICAvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuXHRcdCAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG5cdFx0ICBpZiAocmVzdWx0KSB7XG5cdFx0XHR0aGlzLnVzZXJTZXJ2aWNlLnNpZ25PdXRVc2VyKCk7XG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG5cdFx0XHR0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcblx0XHQgIH1cblx0XHR9KTtcblx0ICB9XG59Il19