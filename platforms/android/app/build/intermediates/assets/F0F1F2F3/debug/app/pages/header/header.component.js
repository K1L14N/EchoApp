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
var nativescript_angular_1 = require("nativescript-angular");
var enums_1 = require("ui/enums");
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
                            name: 'flipLeft',
                            duration: 2000,
                            curve: enums_1.AnimationCurve.easeIn
                        } });
                    //console.log('3');					
                }
                else if (_this.router.isActive('/profil', true)) {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'flipLeft',
                            duration: 2000,
                            curve: enums_1.AnimationCurve.easeIn
                        } });
                    //console.log('4');					
                }
                else if (_this.router.isActive('/about', true)) {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'flipLeft',
                            duration: 2000,
                            curve: enums_1.AnimationCurve.easeIn
                        } });
                    //console.log('5');					
                }
                else {
                    data.cancel = true;
                    _this.routerExtensions.navigate(['/list'], { transition: {
                            name: 'flipLeft',
                            duration: 2000,
                            curve: enums_1.AnimationCurve.easeIn
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
            nativescript_angular_1.RouterExtensions,
            core_1.ChangeDetectorRef])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0YsOERBQTRGO0FBRTVGLDBDQUF5QztBQUN6Qyw0REFBMEQ7QUFDMUQseUNBQTJDO0FBQzNDLDJDQUFzRjtBQUN0RixxQ0FBcUM7QUFDckMsb0NBQXNDO0FBRXRDLDZEQUF3RDtBQUN4RCxrQ0FBMEM7QUFDMUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBU3RDO0lBVUMseUJBQ1MsV0FBd0IsRUFDeEIsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxpQkFBb0M7UUFIcEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWI3QyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUk5QixhQUFRLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhO1lBQzVDLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCO1lBQ3RDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZTtZQUM3QyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQU1VLENBQUM7SUFFbEQsa0NBQVEsR0FBUjtRQUFBLGlCQTREQztRQTNEQSxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdDQUFrQixDQUFDLHdCQUF3QixFQUFFLFVBQUMsSUFBeUM7Z0JBQzdHLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxN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QyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDckMsQ0FBQzt5Q0FhcUIsMEJBQVc7WUFDaEIsZUFBTTtZQUNJLHVDQUFnQjtZQUNmLHdCQUFpQjtPQWRqQyxlQUFlLENBNEkzQjtJQUFELHNCQUFDO0NBQUEsQUE1SUQsSUE0SUM7QUE1SVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmUgfSBmcm9tICd1aS9lbnVtcyc7XG52YXIgZnJhbWVNb2R1bGUgPSByZXF1aXJlKCd1aS9mcmFtZScpO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdoZWFkZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cdHNpZGVkcmF3ZXJPbjogQm9vbGVhbiA9IGZhbHNlO1xuXHRkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG5cdEBWaWV3Q2hpbGQoXCJzaWRlZHJhd2VySWRcIikgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuXHRhY3Rpdml0eSA9IGFwcGxpY2F0aW9uLmFuZHJvaWQuc3RhcnRBY3Rpdml0eSB8fFxuXHRhcHBsaWNhdGlvbi5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eSB8fFxuXHRmcmFtZU1vZHVsZS50b3Btb3N0KCkuYW5kcm9pZC5jdXJyZW50QWN0aXZpdHkgfHxcblx0ZnJhbWVNb2R1bGUudG9wbW9zdCgpLmFuZHJvaWQuYWN0aXZpdHk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG5cdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdGlmICghaXNBbmRyb2lkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZSgnL2xvZ2luJywgdHJ1ZSkpIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCcwJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9saXN0JywgdHJ1ZSkpIHsgLy8gcGFnZSBkJ2FjY3VlaWxcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCcxJyk7XG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdFx0ZGlhbG9ncy5jb25maXJtKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IFwiQ29uZmlybWF0aW9uXCIsXG5cdFx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiVm91bGV6LXZvdXMgdnJhaW1lbnQgcXVpdHRlciBFY2hvID9cIixcblx0XHRcdFx0XHRcdFx0b2tCdXR0b25UZXh0OiBcIk91aVwiLFxuXHRcdFx0XHRcdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBcIkFubnVsZXJcIlxuXHRcdFx0XHRcdFx0fSkudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRcdFx0XHQvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKCFyZXN1bHQpIHsgLy8gamUgbmUgdmV1eCBwYXMgcXVpdHRlclxuXHRcdFx0XHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHsgLy8gamUgdmV1eCBxdWl0dGVyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmFjdGl2aXR5LmZpbmlzaCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnJvdXRlci5pc0FjdGl2ZSgnL2NvbnRhY3RzJywgdHJ1ZSkpIHtcblx0XHRcdFx0XHRkYXRhLmNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2xpc3QnXSwgeyB0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6ICdmbGlwTGVmdCcsXG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAwLFxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZUluXG5cdFx0XHRcdFx0fX0pO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzMnKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9wcm9maWwnLCB0cnVlKSkge1xuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvbGlzdCddLCB7IHRyYW5zaXRpb246IHtcblx0XHRcdFx0XHRcdG5hbWU6ICdmbGlwTGVmdCcsXG5cdFx0XHRcdFx0XHRkdXJhdGlvbjogMjAwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlSW5cblx0XHRcdFx0fX0pO1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzQnKTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoJy9hYm91dCcsIHRydWUpKSB7XG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9saXN0J10sIHsgdHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0bmFtZTogJ2ZsaXBMZWZ0Jyxcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAwLFxuXHRcdFx0XHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJblxuXHRcdFx0XHR9fSk7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnNScpO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIHsgLy9saXN0L3ZpZXcvOmlkXG5cdFx0XHRcdFx0ZGF0YS5jYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9saXN0J10sIHsgdHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0bmFtZTogJ2ZsaXBMZWZ0Jyxcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAwLFxuXHRcdFx0XHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJblxuXHRcdFx0XHR9fSk7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnMicpO1x0XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG5cdFx0dGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cdH1cblxuXHR0b2dnbGVEcmF3ZXIoKSB7XG5cdFx0aWYgKHRoaXMuc2lkZWRyYXdlck9uKSB7XG5cdFx0ICB0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcblx0XHR9IGVsc2Uge1xuXHRcdCAgdGhpcy5vblNob3dEcmF3ZXJUYXAoKTtcblx0XHR9XG5cdH1cblx0XG5cdCAgLy9hcmdzOiBvYnNlcnZhYmxlLkV2ZW50RGF0YVxuXHQgIG9uU2hvd0RyYXdlclRhcCgpIHtcblx0XHQvL2NvbnNvbGUubG9nKFwiRHJhd2VyIG1ldGhvZCByZWFjaGVkXCIpO1xuXHRcdHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcblx0XHR0aGlzLnNpZGVkcmF3ZXJPbiA9ICF0aGlzLnNpZGVkcmF3ZXJPbjtcblx0ICB9XG5cdFxuXHQgIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIkNsb3NlIHJlYWNoZWRcIik7XG5cdFx0dGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcblx0XHR0aGlzLnNpZGVkcmF3ZXJPbiA9ICF0aGlzLnNpZGVkcmF3ZXJPbjtcblx0ICB9XG5cdFxuXHQgIG9uVGFwQWN0dSgpIHtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0J10pO1xuXHRcdHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuXHQgIH1cblx0XG5cdCAgb25UYXBDb250YWN0cygpIHtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jb250YWN0cyddKTtcblx0XHR0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcblx0ICB9XG5cdFxuXHQgIG9uVGFwUHJvZmlsKCkge1xuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Byb2ZpbCddKTtcblx0XHR0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcblx0ICB9XG5cdFxuXHQgIG9uVGFwQWJvdXQoKSB7XG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYWJvdXQnXSk7XG5cdFx0dGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG5cdCAgfVxuXHRcblx0ICBvblRhcExvZ291dCgpIHtcblx0XHRkaWFsb2dzLmNvbmZpcm0oe1xuXHRcdFx0dGl0bGU6IFwiRMOpY29ubmVjdGlvbiBlbiBjb3Vyc1wiLFxuXHRcdFx0bWVzc2FnZTogXCJWb3VsZXotdm91cyB2cmFpbWVudCB2b3VzIGTDqWNvbm5lY3RlciA/XCIsXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT3VpXCIsXG5cdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBcIkFubnVsZXJcIlxuXHRcdH0pLnRoZW4ocmVzdWx0ID0+IHtcblx0XHQgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG5cdFx0ICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcblx0XHQgIGlmIChyZXN1bHQpIHtcblx0XHRcdHRoaXMudXNlclNlcnZpY2Uuc2lnbk91dFVzZXIoKTtcblx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcblx0XHRcdHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuXHRcdCAgfVxuXHRcdH0pO1xuXHQgIH1cbn0iXX0=