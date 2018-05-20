"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("../../shared/user/user");
var user_service_1 = require("../../shared/user/user.service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLCtDQUE4QztBQUM5QywrREFBNkQ7QUFDN0QsMENBQXlDO0FBQ3pDLGdDQUErQjtBQUkvQixrQ0FBMEM7QUFDMUMsMEVBQXdFO0FBVXhFO0lBT0Usd0JBQW9CLE1BQWMsRUFDZCxXQUF3QixFQUN4QixJQUFVLEVBQ1Ysa0JBQXNDO1FBSHRDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVIxRCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQVVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUVoQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuQyxJQUFJLENBQ0g7WUFDRSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN0QyxJQUFJLENBQ0g7WUFDRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3BGLElBQUksU0FBUyxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ25ELFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDaEIsUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUM1RCxLQUFLLEVBQUUsc0JBQWMsQ0FBQyxNQUFNO1NBQzdCLENBQUMsQ0FBQztRQUNILG9CQUFvQjtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQS9EdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7cURBQUM7SUFMbkMsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSx3Q0FBa0IsQ0FBQztZQUM1QyxXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLHVCQUF1QixDQUFDO1NBQ3JFLENBQUM7eUNBUzRCLGVBQU07WUFDRCwwQkFBVztZQUNsQixXQUFJO1lBQ1Usd0NBQWtCO09BVi9DLGNBQWMsQ0FzRTFCO0lBQUQscUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXNlci91c2VyXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBfcmVzb2x2ZUFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvYW5pbWF0aW9uL2FuaW1hdGlvblwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmUgfSBmcm9tIFwidWkvZW51bXNcIjtcbmltcG9ydCB7IEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIEdlb2xvY2F0aW9uU2VydmljZV0sXG4gIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvbG9naW4vbG9naW4uaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXI6IFVzZXI7XG4gIGlzTG9nZ2luZ0luID0gdHJ1ZTtcblxuICAvLyBkZWNvcmF0b3IgdG8gY3JlYXRlIGEgbmV3IHByb3BlcnR5IHRoYXQgcG9pbnRzIGF0IHRoZSBzdGFja2xheW91dCBlbGVtZW50IC0+ICNjb250YWluZXIgbG9jYWwgdmFyIGluIHRlbXBsYXRlXG4gIEBWaWV3Q2hpbGQoXCJjb250YWluZXJcIikgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIFxuICAgICAgICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZVxuICAgICAgICAgICAgICApIHtcbiAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgIHRoaXMudXNlci5lbWFpbCA9ICd0ZXN0QHRlc3QuY29tJztcbiAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSAna2tra2trJztcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7ICBcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAvL3RoaXMucGFnZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInJlczovL2JnX2xvZ2luXCI7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgdGhpcy5sb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpZ25VcCgpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIHRoaXMudXNlclNlcnZpY2Uuc2lnbkluVXNlcih0aGlzLnVzZXIpXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdlcnJldXIgOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UuY3JlYXRlTmV3VXNlcih0aGlzLnVzZXIpXG4gICAgICAudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGFsZXJ0KCdub3V2ZWF1IGNvbXB0ZSBjcsOpw6knKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgYWxlcnQoJ2VycmV1ciA6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cbiAgXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgIHRoaXMuaXNMb2dnaW5nSW4gPyB0aGlzLnBhZ2UuYmFja2dyb3VuZCA9IFwid2hpdGVcIiA6IHRoaXMucGFnZS5iYWNrZ3JvdW5kID0gXCJzYWxtb25cIjtcbiAgICBsZXQgY29udGFpbmVyID0gPFZpZXc+dGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb250YWluZXIuYW5pbWF0ZSh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgdHJhbnNsYXRlOiB0aGlzLmlzTG9nZ2luZ0luID8ge3g6IDAsIHk6IDEwfSA6IHt4OiAwLCB5OiAtMTB9LFxuICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJblxuICAgIH0pO1xuICAgIC8vIGJsYW5rIGJvdGggZmllbGRzXG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgfVxuICBcbn1cbiJdfQ==