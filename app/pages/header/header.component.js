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
var page_1 = require("tns-core-modules/ui/page");
var frameModule = require('ui/frame');
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService, router, routerExtensions, changeDetectorRef, page) {
        this.userService = userService;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.changeDetectorRef = changeDetectorRef;
        this.page = page;
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
                else if (_this.router.isActive('/create', true)) {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'flip',
                            duration: 1000,
                            curve: 'linear'
                        } });
                    //console.log('6');					
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
            core_1.ChangeDetectorRef,
            page_1.Page])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0YsOERBQTRGO0FBRTVGLDBDQUF5QztBQUN6Qyw0REFBMEQ7QUFDMUQseUNBQTJDO0FBQzNDLDJDQUFzRjtBQUN0RixxQ0FBcUM7QUFDckMsb0NBQXNDO0FBRXRDLHNEQUErRDtBQUUvRCxpREFBZ0Q7QUFDaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBU3RDO0lBVUMseUJBQ1MsV0FBd0IsRUFDeEIsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxpQkFBb0MsRUFDcEMsSUFBVTtRQUpWLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWRuQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUk5QixhQUFRLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhO1lBQzVDLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCO1lBQ3RDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZTtZQUM3QyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQU9oQixDQUFDO0lBR3hCLGtDQUFRLEdBQVI7UUFBQSxpQkFvRUM7UUFuRUEsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBUyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElB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Q0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0YsQ0FBQztJQWxKd0I7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQXlCLGdDQUFzQjs0REFBQztJQUg5RCxlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUNyQyxDQUFDO3lDQWFxQiwwQkFBVztZQUNoQixlQUFNO1lBQ0kseUJBQWdCO1lBQ2Ysd0JBQWlCO1lBQzlCLFdBQUk7T0FmUCxlQUFlLENBc0ozQjtJQUFELHNCQUFDO0NBQUEsQUF0SkQsSUFzSkM7QUF0SlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSAndWkvZW51bXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XG52YXIgZnJhbWVNb2R1bGUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdoZWFkZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cdHNpZGVkcmF3ZXJPbjogQm9vbGVhbiA9IGZhbHNlO1xuXHRkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG5cdEBWaWV3Q2hpbGQoXCJzaWRlZHJhd2VySWRcIikgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuXHRhY3Rpdml0eSA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuc3RhcnRBY3Rpdml0eSB8fFxuXHRhcHBsaWNhdGlvbi5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eSB8fFxuXHRmcmFtZU1vZHVsZS50b3Btb3N0KCkuYW5kcm9pZC5jdXJyZW50QWN0aXZpdHkgfHxcblx0ZnJhbWVNb2R1bGUudG9wbW9zdCgpLmFuZHJvaWQuYWN0aXZpdHk7XG5cdFxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UpIHsgfVxuXHRcblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAoIWlzQW5kcm9pZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9sb2dpbicsIHRydWUpKSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnMCcpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKCcvbGlzdCcsIHRydWUpKSB7IC8vIHBhZ2UgZCdhY2N1ZWlsXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnMScpO1xuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGRpYWxvZ3MuY29uZmlybSh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBcIkNvbmZpcm1hdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlOiBcIlZvdWxlei12b3VzIHZyYWltZW50IHF1aXR0ZXIgRWNobyA/XCIsXG5cdFx0XHRcdFx0XHRcdG9rQnV0dG9uVGV4dDogXCJPdWlcIixcblx0XHRcdFx0XHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJBbm51bGVyXCJcblx0XHRcdFx0XHRcdH0pLnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdGlmICghcmVzdWx0KSB7IC8vIGplIG5lIHZldXggcGFzIHF1aXR0ZXJcblx0XHRcdFx0XHRcdFx0XHRkYXRhLmNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7IC8vIGplIHZldXggcXVpdHRlclxuXHRcdFx0XHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hY3Rpdml0eS5maW5pc2goKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9jb250YWN0cycsIHRydWUpKSB7XG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9saXN0J10sIHsgdHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiAnc2xpZGUnLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdFx0Y3VydmU6ICdsaW5lYXInXG5cdFx0XHRcdFx0fX0pO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzMnKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9wcm9maWwnLCB0cnVlKSkge1xuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvbGlzdCddLCB7IHRyYW5zaXRpb246IHtcblx0XHRcdFx0XHRcdG5hbWU6ICdmbGlwTGVmdCcsXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiAnbGluZWFyJ1xuXHRcdFx0XHR9fSk7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnNCcpO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZSgnL2Fib3V0JywgdHJ1ZSkpIHtcblx0XHRcdFx0XHRkYXRhLmNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2xpc3QnXSwgeyB0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRuYW1lOiAnZmxpcCcsXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiAnbGluZWFyJ1xuXHRcdFx0XHR9fSk7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnNScpO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZSgnL2NyZWF0ZScsIHRydWUpKSB7XG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9saXN0J10sIHsgdHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0bmFtZTogJ2ZsaXAnLFxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IDEwMDAsXG5cdFx0XHRcdFx0XHRjdXJ2ZTogJ2xpbmVhcidcblx0XHRcdFx0fX0pO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzYnKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSB7IC8vbGlzdC92aWV3LzppZFxuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvbGlzdCddLCB7IHRyYW5zaXRpb246IHtcblx0XHRcdFx0XHRcdG5hbWU6ICdmYWRlJyxcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0XHRcdFx0Y3VydmU6ICdsaW5lYXInXG5cdFx0XHRcdH19KTtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCcyJyk7XHRcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcblx0XHR0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblx0fVxuXG5cdHRvZ2dsZURyYXdlcigpIHtcblx0XHRpZiAodGhpcy5zaWRlZHJhd2VyT24pIHtcblx0XHQgIHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0ICB0aGlzLm9uU2hvd0RyYXdlclRhcCgpO1xuXHRcdH1cblx0fVxuXHRcblx0ICAvL2FyZ3M6IG9ic2VydmFibGUuRXZlbnREYXRhXG5cdCAgb25TaG93RHJhd2VyVGFwKCkge1xuXHRcdC8vY29uc29sZS5sb2coXCJEcmF3ZXIgbWV0aG9kIHJlYWNoZWRcIik7XG5cdFx0dGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuXHRcdHRoaXMuc2lkZWRyYXdlck9uID0gIXRoaXMuc2lkZWRyYXdlck9uO1xuXHQgIH1cblx0XG5cdCAgb25DbG9zZURyYXdlclRhcCgpIHtcblx0XHQvL2NvbnNvbGUubG9nKFwiQ2xvc2UgcmVhY2hlZFwiKTtcblx0XHR0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuXHRcdHRoaXMuc2lkZWRyYXdlck9uID0gIXRoaXMuc2lkZWRyYXdlck9uO1xuXHQgIH1cblx0XG5cdCAgb25UYXBBY3R1KCkge1xuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG5cdFx0dGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG5cdCAgfVxuXHRcblx0ICBvblRhcENvbnRhY3RzKCkge1xuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NvbnRhY3RzJ10pO1xuXHRcdHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuXHQgIH1cblx0XG5cdCAgb25UYXBQcm9maWwoKSB7XG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcHJvZmlsJ10pO1xuXHRcdHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuXHQgIH1cblx0XG5cdCAgb25UYXBBYm91dCgpIHtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hYm91dCddKTtcblx0XHR0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcblx0ICB9XG5cdFxuXHQgIG9uVGFwTG9nb3V0KCkge1xuXHRcdGRpYWxvZ3MuY29uZmlybSh7XG5cdFx0XHR0aXRsZTogXCJEw6ljb25uZWN0aW9uIGVuIGNvdXJzXCIsXG5cdFx0XHRtZXNzYWdlOiBcIlZvdWxlei12b3VzIHZyYWltZW50IHZvdXMgZMOpY29ubmVjdGVyID9cIixcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJPdWlcIixcblx0XHRcdGNhbmNlbEJ1dHRvblRleHQ6IFwiQW5udWxlclwiXG5cdFx0fSkudGhlbihyZXN1bHQgPT4ge1xuXHRcdCAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cblx0XHQgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuXHRcdCAgaWYgKHJlc3VsdCkge1xuXHRcdFx0dGhpcy51c2VyU2VydmljZS5zaWduT3V0VXNlcigpO1xuXHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xuXHRcdFx0dGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG5cdFx0ICB9XG5cdFx0fSk7XG5cdCAgfVxufSJdfQ==