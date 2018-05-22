"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_1 = require("../../models/echo");
var echo_list_service_1 = require("../../services/echo-list.service");
var user_service_1 = require("../../services/user.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var geolocation_service_1 = require("../../services/geolocation.service");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
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
        this.userService.initUser();
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
    ListComponent.prototype.refreshList = function (args) {
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUNwRiwwQ0FBeUM7QUFDekMsc0VBQW1FO0FBQ25FLDREQUEwRDtBQUcxRCxnQ0FBK0I7QUFDL0IsMENBQXlDO0FBQ3pDLDBFQUF3RTtBQUd4RSwwRUFBd0U7QUFDeEUsa0NBQWUsQ0FBQyxlQUFlLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLGFBQWEsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO0FBRTVGLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBVXpEO0lBYUUsdUJBQ1UsZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsSUFBVSxFQUNWLE1BQWMsRUFDZCxrQkFBc0M7UUFKdEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQWRoRCxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBSzVCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFRMEMsQ0FBQztJQUVyRCxnQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBOUJDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDM0UsVUFBQyxRQUFrQjtZQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkMseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FDN0UsVUFBQyxXQUFtQjtZQUNsQixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZDLHdFQUF3RTtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUNqRSxVQUFDLEtBQWE7WUFDWixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNMLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBR2xDLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwyQkFBRyxHQUFIO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTdCLElBQUksT0FBTyxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLFVBQVUsQ0FBQztZQUNSLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQTdFMkI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVO3dEQUFDO0lBWDNDLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7U0FDL0MsQ0FBQzt5Q0FnQjJCLG1DQUFlO1lBQ25CLDBCQUFXO1lBQ2xCLFdBQUk7WUFDRixlQUFNO1lBQ00sd0NBQWtCO09BbEJyQyxhQUFhLENBMEZ6QjtJQUFELG9CQUFDO0NBQUEsQUExRkQsSUEwRkM7QUExRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZWNob1wiO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcblxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGlzdFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbGlzdC1jb21tb24uY3NzXCIsIFwiLi9saXN0LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGxvY2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGN1cnJlbnRMb2NhdGlvbjogTG9jYXRpb247XG5cbiAgZWNob0xpc3Q6IEVjaG9bXSA9IFtdO1xuICBlY2hvTGlzdFBvcnRlZTogRWNob1tdID0gW107XG5cbiAgZWNob1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBlY2hvUG9ydGVlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZWNobyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJlY2hvVGV4dEZpZWxkXCIpIGVjaG9UZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG4gIFxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UuaW5pdFVzZXIoKTtcbiAgICAvLyBlbiBjYXMgZCd1cGRhdGUgZGUgTG9jYXRpb25cbiAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9jYXRpb25TdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZW1pdExvY2F0aW9uKCk7XG5cbiAgICAvLyBlbiBjYXMgZCd1cGRhdGUgZGUgZWNobyBkYW5zIGxhIHBvcnTDqWVcbiAgICB0aGlzLmVjaG9Qb3J0ZWVTdWJzY3JpcHRpb24gPSB0aGlzLmVjaG9MaXN0U2VydmljZS5lY2hvc1BvcnRlZVN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGVjaG9zUG9ydGVlOiBFY2hvW10pID0+IHtcbiAgICAgICAgdGhpcy5lY2hvTGlzdFBvcnRlZSA9IGVjaG9zUG9ydGVlO1xuICAgICAgfSk7XG4gICAgLy8gZmlyZSBsYSBtw6l0aG9kZSAnbmV4dCcgaWUgaW5pdGlhbGlzZSB0aGlzLmVjaG9MaXN0UG9ydGVlIC4uLlxuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVtaXRFY2hvc1BvcnRlZSgpO1xuXG4gICAgLy8gcGVybWV0IGRlIHNvdXNjcmlyZSBhdSBTdWJqZWN0IGllLiDDqnRyZSBpbmZvcm3DqSBkZSB0b3V0ZSBtb2RpZmljYXRpb25cbiAgICB0aGlzLmVjaG9TdWJzY3JpcHRpb24gPSB0aGlzLmVjaG9MaXN0U2VydmljZS5lY2hvc1N1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGVjaG9zOiBFY2hvW10pID0+IHtcbiAgICAgICAgdGhpcy5lY2hvTGlzdCA9IGVjaG9zO1xuICAgICAgfSk7XG4gICAgLy8gZmlyZSBsYSBtw6l0aG9kZSAnbmV4dCcgaWUgaW5pdGlhbGlzZSB0aGlzLmVjaG9MaXN0IC4uLlxuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVtaXRFY2hvcygpO1xuXG4gICAgLy8gY2hhcmdlIGxlcyBlY2hvc1xuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmdldEVjaG9zKCk7XG5cbiAgICBcbiAgfVxuXG4gIG9uVmlld0VjaG8oaWRFY2hvKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCcsICd2aWV3JywgaWRFY2hvXSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcblxuICAgIGlmICh0aGlzLmVjaG8udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudHJleiB1biBlY2hvXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgLy8gRGlzbWlzcyB0aGUga2V5Ym9hcmRcbiAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmVjaG9UZXh0RmllbGQubmF0aXZlRWxlbWVudDtcbiAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuXG4gICAgdmFyIG5ld0VjaG8gPSBuZXcgRWNobygpO1xuICAgIG5ld0VjaG8ubmFtZSA9IHRoaXMuZWNobztcbiAgICBuZXdFY2hvLmRhdGUgPSBEYXRlLm5vdygpO1xuICAgIG5ld0VjaG8ubGF0aXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sYXRpdHVkZTtcbiAgICBuZXdFY2hvLmxvbmdpdHVkZSA9IHRoaXMuY3VycmVudExvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5jcmVhdGVOZXdFY2hvKG5ld0VjaG8pO1xuICB9XG4gIFxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5lY2hvU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==