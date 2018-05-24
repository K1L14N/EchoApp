"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_1 = require("../../models/echo");
var echo_list_service_1 = require("../../services/echo-list.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var geolocation_service_1 = require("../../services/geolocation.service");
var firebase = require("nativescript-plugin-firebase");
var ListComponent = /** @class */ (function () {
    function ListComponent(echoListService, page, router, geolocationService) {
        this.echoListService = echoListService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        this.echoList = [];
        this.echoListPortee = [];
        this.echo = "";
    }
    ListComponent.prototype.ngOnInit = function () {
        //this.page.actionBarHidden = true;
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
    //args: observable.EventData
    ListComponent.prototype.showSideDrawer = function (args) {
        console.log("Show SideDrawer tapped.");
        // Show sidedrawer ...
        this.router.navigate(['/params']);
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
            page_1.Page,
            router_1.Router,
            geolocation_service_1.GeolocationService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUNwRiwwQ0FBeUM7QUFDekMsc0VBQW1FO0FBR25FLGdDQUErQjtBQUMvQiwwQ0FBeUM7QUFDekMsMEVBQXdFO0FBR3hFLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBU3pEO0lBZUUsdUJBQW9CLGVBQWdDLEVBQ2hDLElBQVUsRUFDVixNQUFjLEVBQ2Qsa0JBQXNDO1FBSHRDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFiMUQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUs1QixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBT21ELENBQUM7SUFFOUQsZ0NBQVEsR0FBUjtRQUNFLG1DQUFtQztRQURyQyxpQkE4QkM7UUEzQkMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDM0UsVUFBQyxRQUFrQjtZQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkMseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FDN0UsVUFBQyxXQUFtQjtZQUNsQixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZDLHdFQUF3RTtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUNqRSxVQUFDLEtBQWE7WUFDWixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNMLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwyQkFBRyxHQUFIO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTdCLElBQUksT0FBTyxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCw0QkFBNEI7SUFDNUIsc0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQTNFMkI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVO3dEQUFDO0lBWjNDLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7U0FDL0MsQ0FBQzt5Q0FpQnFDLG1DQUFlO1lBQzFCLFdBQUk7WUFDRixlQUFNO1lBQ00sd0NBQWtCO09BbEIvQyxhQUFhLENBd0Z6QjtJQUFELG9CQUFDO0NBQUEsQUF4RkQsSUF3RkM7QUF4Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZWNob1wiO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfcKgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJztcblxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9saXN0Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2xpc3QtY29tbW9uLmNzc1wiLCBcIi4vbGlzdC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGxvY2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGN1cnJlbnRMb2NhdGlvbjogTG9jYXRpb247XG5cbiAgZWNob0xpc3Q6IEVjaG9bXSA9IFtdO1xuICBlY2hvTGlzdFBvcnRlZTogRWNob1tdID0gW107XG5cbiAgZWNob1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBlY2hvUG9ydGVlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZWNobyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJlY2hvVGV4dEZpZWxkXCIpIGVjaG9UZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy90aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBMb2NhdGlvblxuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvblN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBlY2hvIGRhbnMgbGEgcG9ydMOpZVxuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3NQb3J0ZWU6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0UG9ydGVlID0gZWNob3NQb3J0ZWU7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3RQb3J0ZWUgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zUG9ydGVlKCk7XG5cbiAgICAvLyBwZXJtZXQgZGUgc291c2NyaXJlIGF1IFN1YmplY3QgaWUuIMOqdHJlIGluZm9ybcOpIGRlIHRvdXRlIG1vZGlmaWNhdGlvblxuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3M6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0ID0gZWNob3M7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3QgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zKCk7XG5cbiAgICAvLyBjaGFyZ2UgbGVzIGVjaG9zXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKTtcbiAgfVxuXG4gIG9uVmlld0VjaG8oaWRFY2hvKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCcsICd2aWV3JywgaWRFY2hvXSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcblxuICAgIGlmICh0aGlzLmVjaG8udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudHJleiB1biBlY2hvXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERpc21pc3MgdGhlIGtleWJvYXJkXG4gICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5lY2hvVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgIHZhciBuZXdFY2hvID0gbmV3IEVjaG8oKTtcbiAgICBuZXdFY2hvLm5hbWUgPSB0aGlzLmVjaG87XG4gICAgbmV3RWNoby5kYXRlID0gRGF0ZS5ub3coKTtcbiAgICBuZXdFY2hvLmxhdGl0dWRlID0gdGhpcy5jdXJyZW50TG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgbmV3RWNoby5sb25naXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuY3JlYXRlTmV3RWNobyhuZXdFY2hvKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmVjaG9Qb3J0ZWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8vYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGFcbiAgc2hvd1NpZGVEcmF3ZXIoYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiU2hvdyBTaWRlRHJhd2VyIHRhcHBlZC5cIik7XG4gICAgLy8gU2hvdyBzaWRlZHJhd2VyIC4uLlxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3BhcmFtcyddKTtcbiAgfVxufVxuIl19