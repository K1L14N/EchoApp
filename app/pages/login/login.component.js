"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("../../models/user");
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var enums_1 = require("ui/enums");
var geolocation_service_1 = require("../../services/geolocation.service");
var contacts_service_1 = require("../../services/contacts.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, page, geolocationService, contactsService) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.geolocationService = geolocationService;
        this.contactsService = contactsService;
        this.isLoggingIn = true;
        this.user = new user_1.User();
        this.user.email = 'test@test.com';
        this.user.password = 'kkkkkk';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        //this.page.backgroundImage = "res://bg_login";
        this.geolocationService.updateLocation();
    };
    LoginComponent.prototype.submit = function () {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.userService.signInUser(this.user)
            .then(function () {
            _this.router.navigate(['/list']);
            _this.page.actionBarHidden = false;
        }, function (error) {
            alert('erreur : ' + error);
        });
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.createNewUser(this.user)
            .then(function () {
            alert('nouveau compte créé');
            _this.toggleDisplay();
        }, function (error) {
            alert('erreur : ' + error);
        });
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
        this.isLoggingIn ? this.page.background = "white" : this.page.background = "salmon";
        var container = this.container.nativeElement;
        container.animate({
            duration: 400,
            translate: this.isLoggingIn ? { x: 0, y: 10 } : { x: 0, y: -10 },
            curve: enums_1.AnimationCurve.easeIn
        });
        // blank both fields
        this.user = new user_1.User();
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "container", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            providers: [user_service_1.UserService, geolocation_service_1.GeolocationService, contacts_service_1.ContactsService],
            templateUrl: "./pages/login/login.html",
            styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            user_service_1.UserService,
            page_1.Page,
            geolocation_service_1.GeolocationService,
            contacts_service_1.ContactsService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6Qyw0REFBMEQ7QUFDMUQsMENBQXlDO0FBQ3pDLGdDQUErQjtBQUkvQixrQ0FBMEM7QUFDMUMsMEVBQXdFO0FBQ3hFLG9FQUFrRTtBQVNsRTtJQU9FLHdCQUFvQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsSUFBVSxFQUNWLGtCQUFzQyxFQUN0QyxlQUFnQztRQUpoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBVHBELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBV2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBRWhDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLCtDQUErQztRQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ25DLElBQUksQ0FDSDtZQUNFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN0QyxJQUFJLENBQ0g7WUFDRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3BGLElBQUksU0FBUyxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ25ELFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDaEIsUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUM1RCxLQUFLLEVBQUUsc0JBQWMsQ0FBQyxNQUFNO1NBQzdCLENBQUMsQ0FBQztRQUNILG9CQUFvQjtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQWpFdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7cURBQUM7SUFMbkMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSx3Q0FBa0IsRUFBRSxrQ0FBZSxDQUFDO1lBQzdELFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMsOEJBQThCLEVBQUUsdUJBQXVCLENBQUM7U0FDckUsQ0FBQzt5Q0FTNEIsZUFBTTtZQUNELDBCQUFXO1lBQ2xCLFdBQUk7WUFDVSx3Q0FBa0I7WUFDckIsa0NBQWU7T0FYekMsY0FBYyxDQXdFMUI7SUFBRCxxQkFBQztDQUFBLEFBeEVELElBd0VDO0FBeEVZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBfcmVzb2x2ZUFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYW5pbWF0aW9uL2FuaW1hdGlvblwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmUgfSBmcm9tIFwidWkvZW51bXNcIjtcbmltcG9ydCB7IEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGFjdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29udGFjdHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIEdlb2xvY2F0aW9uU2VydmljZSwgQ29udGFjdHNTZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcInBhZ2VzL2xvZ2luL2xvZ2luLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdXNlcjogVXNlcjtcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xuXG4gIC8vIGRlY29yYXRvciB0byBjcmVhdGUgYSBuZXcgcHJvcGVydHkgdGhhdCBwb2ludHMgYXQgdGhlIHN0YWNrbGF5b3V0IGVsZW1lbnQgLT4gI2NvbnRhaW5lciBsb2NhbCB2YXIgaW4gdGVtcGxhdGVcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgXG4gICAgICAgICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbnRhY3RzU2VydmljZTogQ29udGFjdHNTZXJ2aWNlXG4gICAgICAgICAgICAgICkge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgdGhpcy51c2VyLmVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nO1xuICAgIHRoaXMudXNlci5wYXNzd29yZCA9ICdra2tra2snO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHsgIFxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIC8vdGhpcy5wYWdlLmJhY2tncm91bmRJbWFnZSA9IFwicmVzOi8vYmdfbG9naW5cIjtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIGlmICh0aGlzLmlzTG9nZ2luZ0luKSB7XG4gICAgICB0aGlzLmxvZ2luKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2lnblVwKCk7XG4gICAgfVxuICB9XG5cbiAgbG9naW4oKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5zaWduSW5Vc2VyKHRoaXMudXNlcilcbiAgICAgIC50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCddKTtcbiAgICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdlcnJldXIgOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UuY3JlYXRlTmV3VXNlcih0aGlzLnVzZXIpXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdub3V2ZWF1IGNvbXB0ZSBjcsOpw6knKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgYWxlcnQoJ2VycmV1ciA6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbiAgXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIHRoaXMuaXNMb2dnaW5nSW4gPyB0aGlzLnBhZ2UuYmFja2dyb3VuZCA9IFwid2hpdGVcIiA6IHRoaXMucGFnZS5iYWNrZ3JvdW5kID0gXCJzYWxtb25cIjtcbiAgICBsZXQgY29udGFpbmVyID0gPFZpZXc+dGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb250YWluZXIuYW5pbWF0ZSh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgdHJhbnNsYXRlOiB0aGlzLmlzTG9nZ2luZ0luID8ge3g6IDAsIHk6IDEwfSA6IHt4OiAwLCB5OiAtMTB9LFxuICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJblxuICAgIH0pO1xuICAgIC8vIGJsYW5rIGJvdGggZmllbGRzXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgfVxuICBcbn1cbiJdfQ==