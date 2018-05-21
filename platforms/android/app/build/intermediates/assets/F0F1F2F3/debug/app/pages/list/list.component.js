"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_1 = require("../../models/echo");
var echo_list_service_1 = require("../../services/echo-list.service");
var user_service_1 = require("../../services/user.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var geolocation_service_1 = require("../../services/geolocation.service");
var firebase = require("nativescript-plugin-firebase");
var ListComponent = /** @class */ (function () {
    function ListComponent(echoListService, userService, page, router, geolocationService) {
        this.echoListService = echoListService;
        this.userService = userService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        this.echoList = [];
        this.echoListPortee = [];
        this.echo = "";
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // en cas d'update de Location
        this.locationSubscription = this.geolocationService.locationSubject.subscribe(function (location) {
            _this.currentLocation = location;
        });
        this.geolocationService.updateLocation();
        this.geolocationService.emitLocation();
        // en cas d'update de echo dans la portée
        this.echoPorteeSubscription = this.echoListService.echosPorteeSubject.subscribe(function (echosPortee) {
            _this.echoListPortee = echosPortee;
        });
        // fire la méthode 'next' ie initialise this.echoListPortee ...
        this.echoListService.emitEchosPortee();
        // permet de souscrire au Subject ie. être informé de toute modification
        this.echoSubscription = this.echoListService.echosSubject.subscribe(function (echos) {
            _this.echoList = echos;
        });
        // fire la méthode 'next' ie initialise this.echoList ...
        this.echoListService.emitEchos();
        // charge les echos
        this.echoListService.getEchos();
    };
    ListComponent.prototype.onViewEcho = function (idEcho) {
        this.router.navigate(['/list', 'view', idEcho]);
    };
    ListComponent.prototype.add = function () {
        this.geolocationService.updateLocation();
        if (this.echo.trim() === "") {
            alert("Entrez un echo");
            return;
        }
        // Dismiss the keyboard
        var textField = this.echoTextField.nativeElement;
        textField.dismissSoftInput();
        var newEcho = new echo_1.Echo();
        newEcho.name = this.echo;
        newEcho.date = Date.now();
        newEcho.latitude = this.currentLocation.latitude;
        newEcho.longitude = this.currentLocation.longitude;
        this.echoListService.createNewEcho(newEcho);
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.echoSubscription.unsubscribe();
        this.locationSubscription.unsubscribe();
        this.echoPorteeSubscription.unsubscribe();
    };
    __decorate([
        core_1.ViewChild("echoTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "echoTextField", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: "list",
            moduleId: module.id,
            templateUrl: "./list.html",
            styleUrls: ["./list-common.css", "./list.css"]
        }),
        __metadata("design:paramtypes", [echo_list_service_1.EchoListService,
            user_service_1.UserService,
            page_1.Page,
            router_1.Router,
            geolocation_service_1.GeolocationService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUNwRiwwQ0FBeUM7QUFDekMsc0VBQW1FO0FBQ25FLDREQUEwRDtBQUcxRCxnQ0FBK0I7QUFDL0IsMENBQXlDO0FBQ3pDLDBFQUF3RTtBQUl4RSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVV6RDtJQWFFLHVCQUNVLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLElBQVUsRUFDVixNQUFjLEVBQ2Qsa0JBQXNDO1FBSnRDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFkaEQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUs1QixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBUTBDLENBQUM7SUFFckQsZ0NBQVEsR0FBUjtRQUFBLGlCQThCQztRQTdCQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUMzRSxVQUFDLFFBQWtCO1lBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2Qyx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUM3RSxVQUFDLFdBQW1CO1lBQ2xCLEtBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkMsd0VBQXdFO1FBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ2pFLFVBQUMsS0FBYTtZQUNaLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wseURBQXlEO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFHbEMsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxNQUFNO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDJCQUFHLEdBQUg7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCx1QkFBdUI7UUFDdkIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDNUQsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUNqRCxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1FBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQXJFMkI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVO3dEQUFDO0lBWDNDLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7U0FDL0MsQ0FBQzt5Q0FnQjJCLG1DQUFlO1lBQ25CLDBCQUFXO1lBQ2xCLFdBQUk7WUFDRixlQUFNO1lBQ00sd0NBQWtCO09BbEJyQyxhQUFhLENBa0Z6QjtJQUFELG9CQUFDO0NBQUEsQUFsRkQsSUFrRkM7QUFsRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZWNob1wiO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGlzdFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbGlzdC1jb21tb24uY3NzXCIsIFwiLi9saXN0LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGxvY2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGN1cnJlbnRMb2NhdGlvbjogTG9jYXRpb247XG5cbiAgZWNob0xpc3Q6IEVjaG9bXSA9IFtdO1xuICBlY2hvTGlzdFBvcnRlZTogRWNob1tdID0gW107XG5cbiAgZWNob1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBlY2hvUG9ydGVlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZWNobyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJlY2hvVGV4dEZpZWxkXCIpIGVjaG9UZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIFxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBMb2NhdGlvblxuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvblN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBlY2hvIGRhbnMgbGEgcG9ydMOpZVxuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3NQb3J0ZWU6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0UG9ydGVlID0gZWNob3NQb3J0ZWU7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3RQb3J0ZWUgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zUG9ydGVlKCk7XG5cbiAgICAvLyBwZXJtZXQgZGUgc291c2NyaXJlIGF1IFN1YmplY3QgaWUuIMOqdHJlIGluZm9ybcOpIGRlIHRvdXRlIG1vZGlmaWNhdGlvblxuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3M6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0ID0gZWNob3M7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3QgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zKCk7XG5cbiAgICAvLyBjaGFyZ2UgbGVzIGVjaG9zXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKTtcblxuICAgIFxuICB9XG5cbiAgb25WaWV3RWNobyhpZEVjaG8pIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0JywgJ3ZpZXcnLCBpZEVjaG9dKTtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuZWNoby50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiRW50cmV6IHVuIGVjaG9cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICAvLyBEaXNtaXNzIHRoZSBrZXlib2FyZFxuICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZWNob1RleHRGaWVsZC5uYXRpdmVFbGVtZW50O1xuICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG5cbiAgICB2YXIgbmV3RWNobyA9IG5ldyBFY2hvKCk7XG4gICAgbmV3RWNoby5uYW1lID0gdGhpcy5lY2hvO1xuICAgIG5ld0VjaG8uZGF0ZSA9IERhdGUubm93KCk7XG4gICAgbmV3RWNoby5sYXRpdHVkZSA9IHRoaXMuY3VycmVudExvY2F0aW9uLmxhdGl0dWRlO1xuICAgIG5ld0VjaG8ubG9uZ2l0dWRlID0gdGhpcy5jdXJyZW50TG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmNyZWF0ZU5ld0VjaG8obmV3RWNobyk7XG4gIH1cbiAgXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmVjaG9Qb3J0ZWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=