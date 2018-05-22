"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_list_service_1 = require("../../services/echo-list.service");
var echo_1 = require("../../models/echo");
var geolocation_service_1 = require("../../services/geolocation.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(echoListService, geolocationService, page, router) {
        this.echoListService = echoListService;
        this.geolocationService = geolocationService;
        this.page = page;
        this.router = router;
        this.echo = "";
    }
    CreateComponent.prototype.ngOnInit = function () { };
    CreateComponent.prototype.add = function () {
        var _this = this;
        if (this.echo.trim() === "") {
            alert("Entrez un echo");
            return;
        }
        this.geolocationService.updateLocation();
        this.locationSubscription = this.geolocationService.locationSubject.subscribe(function (location) {
            _this.currentLocation = location;
        });
        this.geolocationService.updateLocation();
        this.geolocationService.emitLocation();
        var newEcho = new echo_1.Echo();
        newEcho.name = this.echo;
        newEcho.date = Date.now();
        newEcho.latitude = this.currentLocation.latitude;
        newEcho.longitude = this.currentLocation.longitude;
        this.echoListService.getEchos().then(function () {
            _this.echoListService.createNewEcho(newEcho);
            _this.router.navigate(['/list']);
        });
    };
    __decorate([
        core_1.ViewChild("echoTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], CreateComponent.prototype, "echoTextField", void 0);
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'create',
            moduleId: module.id,
            templateUrl: './create.component.html',
            styleUrls: ['./create.component.css'],
            providers: [echo_list_service_1.EchoListService]
        }),
        __metadata("design:paramtypes", [echo_list_service_1.EchoListService,
            geolocation_service_1.GeolocationService,
            page_1.Page,
            router_1.Router])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDBDQUF5QztBQUV6QywwRUFBd0U7QUFDeEUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQVl6QztJQU9DLHlCQUNTLGVBQWdDLEVBQ2hDLGtCQUFzQyxFQUN0QyxJQUFVLEVBQ1YsTUFBYztRQUhkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUHZCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFPaUIsQ0FBQztJQUU1QixrQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLDZCQUFHLEdBQUg7UUFBQSxpQkF1Qkc7UUF0QkYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUM1RSxVQUFDLFFBQWtCO1lBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUMsQ0FDQyxDQUFDO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6QixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDbkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDcEMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0YsQ0FBQztJQWpDMEI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVOzBEQUFDO0lBTDNDLGVBQWU7UUFSM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLFNBQVMsRUFBRSxDQUFFLG1DQUFlLENBQUU7U0FDOUIsQ0FBQzt5Q0FVeUIsbUNBQWU7WUFDWix3Q0FBa0I7WUFDaEMsV0FBSTtZQUNGLGVBQU07T0FYWCxlQUFlLENBdUMzQjtJQUFELHNCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUF2Q1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VjaG8nO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2NyZWF0ZScsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiAnLi9jcmVhdGUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9jcmVhdGUuY29tcG9uZW50LmNzcyddLFxuXHRwcm92aWRlcnM6IFsgRWNob0xpc3RTZXJ2aWNlIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdGxvY2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGN1cnJlbnRMb2NhdGlvbjogTG9jYXRpb247XG5cdGVjaG8gPSBcIlwiO1xuICBAVmlld0NoaWxkKFwiZWNob1RleHRGaWVsZFwiKSBlY2hvVGV4dEZpZWxkOiBFbGVtZW50UmVmO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgZWNob0xpc3RTZXJ2aWNlOiBFY2hvTGlzdFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXG5cdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikgeyB9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRhZGQoKSB7XG5cdFx0aWYgKHRoaXMuZWNoby50cmltKCkgPT09IFwiXCIpIHtcblx0XHQgIGFsZXJ0KFwiRW50cmV6IHVuIGVjaG9cIik7XG5cdFx0ICByZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG5cdFx0dGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvY2F0aW9uU3ViamVjdC5zdWJzY3JpYmUoXG5cdFx0XHQobG9jYXRpb246IExvY2F0aW9uKSA9PiB7XG5cdFx0XHQgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG5cdFx0XHR9XG5cdFx0ICApO1xuXHRcdHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG5cdFx0dGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZW1pdExvY2F0aW9uKCk7XG5cdFxuXHRcdHZhciBuZXdFY2hvID0gbmV3IEVjaG8oKTtcblx0XHRuZXdFY2hvLm5hbWUgPSB0aGlzLmVjaG87XG5cdFx0bmV3RWNoby5kYXRlID0gRGF0ZS5ub3coKTtcblx0XHRuZXdFY2hvLmxhdGl0dWRlID0gdGhpcy5jdXJyZW50TG9jYXRpb24ubGF0aXR1ZGU7XG5cdFx0bmV3RWNoby5sb25naXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sb25naXR1ZGU7XG5cdFx0dGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuZWNob0xpc3RTZXJ2aWNlLmNyZWF0ZU5ld0VjaG8obmV3RWNobyk7XG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0J10pO1xuXHRcdH0pO1xuXHQgIH1cbn0iXX0=