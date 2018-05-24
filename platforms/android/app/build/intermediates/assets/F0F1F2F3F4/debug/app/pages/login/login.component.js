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
            alert('erreur : ' + JSON.stringify(error));
        });
    };
    LoginComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.createNewUser(this.user)
            .then(function () {
            alert('nouveau compte créé');
            _this.toggleDisplay();
        }, function (error) {
            alert('erreur : ' + JSON.stringify(error));
        });
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
        var container = this.container.nativeElement;
        container.animate({
            duration: 400,
            translate: this.isLoggingIn ? { x: 0, y: 10 } : { x: 0, y: -10 },
            curve: enums_1.AnimationCurve.ease
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUN6Qyw0REFBMEQ7QUFDMUQsMENBQXlDO0FBQ3pDLGdDQUErQjtBQUkvQixrQ0FBMEM7QUFDMUMsMEVBQXdFO0FBQ3hFLG9FQUFrRTtBQVNsRTtJQU9FLHdCQUFvQixNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsSUFBVSxFQUNWLGtCQUFzQyxFQUN0QyxlQUFnQztRQUpoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBVHBELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBV2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBRWhDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0gsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbkMsSUFBSSxDQUNIO1lBQ0UsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNwQyxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0osS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN0QyxJQUFJLENBQ0g7WUFDRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUNuRCxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDNUQsS0FBSyxFQUFFLHNCQUFjLENBQUMsSUFBSTtTQUMzQixDQUFDLENBQUM7UUFDSCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUEvRHVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBTG5DLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLEVBQUUsd0NBQWtCLEVBQUUsa0NBQWUsQ0FBQztZQUM3RCxXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO1NBQ3JFLENBQUM7eUNBUzRCLGVBQU07WUFDRCwwQkFBVztZQUNsQixXQUFJO1lBQ1Usd0NBQWtCO1lBQ3JCLGtDQUFlO09BWHpDLGNBQWMsQ0FzRTFCO0lBQUQscUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlclwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgX3Jlc29sdmVBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FuaW1hdGlvbi9hbmltYXRpb25cIjtcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nZW9sb2NhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRhY3RzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbnRhY3RzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibXktYXBwXCIsXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlLCBHZW9sb2NhdGlvblNlcnZpY2UsIENvbnRhY3RzU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXI6IFVzZXI7XG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcblxuICAvLyBkZWNvcmF0b3IgdG8gY3JlYXRlIGEgbmV3IHByb3BlcnR5IHRoYXQgcG9pbnRzIGF0IHRoZSBzdGFja2xheW91dCBlbGVtZW50IC0+ICNjb250YWluZXIgbG9jYWwgdmFyIGluIHRlbXBsYXRlXG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIFxuICAgICAgICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb250YWN0c1NlcnZpY2U6IENvbnRhY3RzU2VydmljZVxuICAgICAgICAgICAgICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgIHRoaXMudXNlci5lbWFpbCA9ICd0ZXN0QHRlc3QuY29tJztcbiAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSAna2tra2trJztcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgdGhpcy5sb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpZ25VcCgpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIHRoaXMudXNlclNlcnZpY2Uuc2lnbkluVXNlcih0aGlzLnVzZXIpXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG4gICAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBhbGVydCgnZXJyZXVyIDogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBzaWduVXAoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5jcmVhdGVOZXdVc2VyKHRoaXMudXNlcilcbiAgICAgIC50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYWxlcnQoJ25vdXZlYXUgY29tcHRlIGNyw6nDqScpO1xuICAgICAgICAgIHRoaXMudG9nZ2xlRGlzcGxheSgpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBhbGVydCgnZXJyZXVyIDogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbiAgXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIGxldCBjb250YWluZXIgPSA8Vmlldz50aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnRhaW5lci5hbmltYXRlKHtcbiAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICB0cmFuc2xhdGU6IHRoaXMuaXNMb2dnaW5nSW4gPyB7eDogMCwgeTogMTB9IDoge3g6IDAsIHk6IC0xMH0sXG4gICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZVxuICAgIH0pO1xuICAgIC8vIGJsYW5rIGJvdGggZmllbGRzXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgfVxuICBcbn1cbiJdfQ==