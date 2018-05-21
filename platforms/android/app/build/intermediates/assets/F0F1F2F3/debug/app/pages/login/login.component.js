"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("../../models/user");
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var enums_1 = require("ui/enums");
var geolocation_service_1 = require("../../services/geolocation.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, page, geolocationService) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.geolocationService = geolocationService;
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
            providers: [user_service_1.UserService, geolocation_service_1.GeolocationService],
            templateUrl: "./pages/login/login.html",
            styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            user_service_1.UserService,
            page_1.Page,
            geolocation_service_1.GeolocationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6Qyw0REFBMEQ7QUFDMUQsMENBQXlDO0FBQ3pDLGdDQUErQjtBQUkvQixrQ0FBMEM7QUFDMUMsMEVBQXdFO0FBVXhFO0lBT0Usd0JBQW9CLE1BQWMsRUFDZCxXQUF3QixFQUN4QixJQUFVLEVBQ1Ysa0JBQXNDO1FBSHRDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVIxRCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQVVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUVoQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuQyxJQUFJLENBQ0g7WUFDRSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDSixLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELCtCQUFNLEdBQU47UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDdEMsSUFBSSxDQUNIO1lBQ0UsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDN0IsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDSixLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUNwRixJQUFJLFNBQVMsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUNuRCxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDNUQsS0FBSyxFQUFFLHNCQUFjLENBQUMsTUFBTTtTQUM3QixDQUFDLENBQUM7UUFDSCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFoRXVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBTG5DLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLEVBQUUsd0NBQWtCLENBQUM7WUFDNUMsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBdUIsQ0FBQztTQUNyRSxDQUFDO3lDQVM0QixlQUFNO1lBQ0QsMEJBQVc7WUFDbEIsV0FBSTtZQUNVLHdDQUFrQjtPQVYvQyxjQUFjLENBdUUxQjtJQUFELHFCQUFDO0NBQUEsQUF2RUQsSUF1RUM7QUF2RVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXJcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IF9yZXNvbHZlQW5pbWF0aW9uQ3VydmUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hbmltYXRpb24vYW5pbWF0aW9uXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZSwgR2VvbG9jYXRpb25TZXJ2aWNlXSxcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wicGFnZXMvbG9naW4vbG9naW4tY29tbW9uLmNzc1wiLCBcInBhZ2VzL2xvZ2luL2xvZ2luLmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdXNlcjogVXNlcjtcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xuXG4gIC8vIGRlY29yYXRvciB0byBjcmVhdGUgYSBuZXcgcHJvcGVydHkgdGhhdCBwb2ludHMgYXQgdGhlIHN0YWNrbGF5b3V0IGVsZW1lbnQgLT4gI2NvbnRhaW5lciBsb2NhbCB2YXIgaW4gdGVtcGxhdGVcbiAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgXG4gICAgICAgICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlXG4gICAgICAgICAgICAgICkge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgdGhpcy51c2VyLmVtYWlsID0gJ3Rlc3RAdGVzdC5jb20nO1xuICAgIHRoaXMudXNlci5wYXNzd29yZCA9ICdra2tra2snO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHsgIFxuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIC8vdGhpcy5wYWdlLmJhY2tncm91bmRJbWFnZSA9IFwicmVzOi8vYmdfbG9naW5cIjtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIGlmICh0aGlzLmlzTG9nZ2luZ0luKSB7XG4gICAgICB0aGlzLmxvZ2luKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2lnblVwKCk7XG4gICAgfVxuICB9XG5cbiAgbG9naW4oKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5zaWduSW5Vc2VyKHRoaXMudXNlcilcbiAgICAgIC50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCddKTtcbiAgICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdlcnJldXIgOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UuY3JlYXRlTmV3VXNlcih0aGlzLnVzZXIpXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdub3V2ZWF1IGNvbXB0ZSBjcsOpw6knKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgYWxlcnQoJ2VycmV1ciA6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbiAgXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIHRoaXMuaXNMb2dnaW5nSW4gPyB0aGlzLnBhZ2UuYmFja2dyb3VuZCA9IFwid2hpdGVcIiA6IHRoaXMucGFnZS5iYWNrZ3JvdW5kID0gXCJzYWxtb25cIjtcbiAgICBsZXQgY29udGFpbmVyID0gPFZpZXc+dGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb250YWluZXIuYW5pbWF0ZSh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgdHJhbnNsYXRlOiB0aGlzLmlzTG9nZ2luZ0luID8ge3g6IDAsIHk6IDEwfSA6IHt4OiAwLCB5OiAtMTB9LFxuICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJblxuICAgIH0pO1xuICAgIC8vIGJsYW5rIGJvdGggZmllbGRzXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgfVxuICBcbn1cbiJdfQ==