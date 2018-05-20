"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_1 = require("../../shared/echo/echo");
var echo_list_service_1 = require("../../shared/echo/echo-list.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var geolocation_service_1 = require("../../services/geolocation.service");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var firebase = require("nativescript-plugin-firebase");
var ListComponent = /** @class */ (function () {
    function ListComponent(echoListService, page, router, geolocationService, changeDetectorRef) {
        this.echoListService = echoListService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        this.changeDetectorRef = changeDetectorRef;
        this.echoList = [];
        this.echoListPortee = [];
        this.echo = "";
    }
    ListComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectorRef.detectChanges();
    };
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
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
    ListComponent.prototype.onShowDrawerTap = function () {
        console.log("Drawer method reached");
        this.drawer.showDrawer();
    };
    ListComponent.prototype.onCloseDrawerTap = function () {
        console.log("Close reached");
        this.drawer.closeDrawer();
    };
    __decorate([
        core_1.ViewChild("echoTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "echoTextField", void 0);
    __decorate([
        core_1.ViewChild("#sidedrawerId"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ListComponent.prototype, "drawerComponent", void 0);
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
            geolocation_service_1.GeolocationService,
            core_1.ChangeDetectorRef])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1SDtBQUN2SCwrQ0FBOEM7QUFDOUMseUVBQXNFO0FBR3RFLGdDQUErQjtBQUMvQiwwQ0FBeUM7QUFDekMsMEVBQXdFO0FBR3hFLDhEQUE0RjtBQUc1RixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVN6RDtJQW1CRSx1QkFBb0IsZUFBZ0MsRUFDaEMsSUFBVSxFQUNWLE1BQWMsRUFDZCxrQkFBc0MsRUFDdEMsaUJBQW9DO1FBSnBDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWxCeEQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUs1QixTQUFJLEdBQUcsRUFBRSxDQUFDO0lBWWlELENBQUM7SUFFNUQsdUNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBOEJDO1FBN0JDLElBQUksQ0FBQyxlQUFlLEdBQUcsNlJBQTZSLENBQUM7UUFFclQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDM0UsVUFBQyxRQUFrQjtZQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkMseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FDN0UsVUFBQyxXQUFtQjtZQUNsQixLQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZDLHdFQUF3RTtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUNqRSxVQUFDLEtBQWE7WUFDWixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNMLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwyQkFBRyxHQUFIO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzVELFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTdCLElBQUksT0FBTyxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDakQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCw0QkFBNEI7SUFDNUIsdUNBQWUsR0FBZjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx3Q0FBZ0IsR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQXpGMkI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVO3dEQUFDO0lBSzFCO1FBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDO2tDQUF5QixnQ0FBc0I7MERBQUM7SUFqQmhFLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7U0FDL0MsQ0FBQzt5Q0FxQnFDLG1DQUFlO1lBQzFCLFdBQUk7WUFDRixlQUFNO1lBQ00sd0NBQWtCO1lBQ25CLHdCQUFpQjtPQXZCN0MsYUFBYSxDQXNHekI7SUFBRCxvQkFBQztDQUFBLEFBdEdELElBc0dDO0FBdEdZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiAgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZWNoby9lY2hvXCI7XG5pbXBvcnQgeyBFY2hvTGlzdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2VjaG8vZWNoby1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaXN0XCIsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiBcIi4vbGlzdC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9saXN0LWNvbW1vbi5jc3NcIiwgXCIuL2xpc3QuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcblxuICBsb2NhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBjdXJyZW50TG9jYXRpb246IExvY2F0aW9uO1xuXG4gIGVjaG9MaXN0OiBFY2hvW10gPSBbXTtcbiAgZWNob0xpc3RQb3J0ZWU6IEVjaG9bXSA9IFtdO1xuXG4gIGVjaG9TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgZWNob1BvcnRlZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGVjaG8gPSBcIlwiO1xuICBAVmlld0NoaWxkKFwiZWNob1RleHRGaWVsZFwiKSBlY2hvVGV4dEZpZWxkOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgbWFpbkNvbnRlbnRUZXh0OiBzdHJpbmc7XG4gIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuIFxuICBAVmlld0NoaWxkKFwiI3NpZGVkcmF3ZXJJZFwiKSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlY2hvTGlzdFNlcnZpY2U6IEVjaG9MaXN0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYWluQ29udGVudFRleHQgPSBcIlNpZGVEcmF3ZXIgZm9yIE5hdGl2ZVNjcmlwdCBjYW4gYmUgZWFzaWx5IHNldHVwIGluIHRoZSBIVE1MIGRlZmluaXRpb24gb2YgeW91ciBwYWdlIGJ5IGRlZmluaW5nIHRrRHJhd2VyQ29udGVudCBhbmQgdGtNYWluQ29udGVudC4gVGhlIGNvbXBvbmVudCBoYXMgYSBkZWZhdWx0IHRyYW5zaXRpb24gYW5kIHBvc2l0aW9uIGFuZCBhbHNvIGV4cG9zZXMgbm90aWZpY2F0aW9ucyByZWxhdGVkIHRvIGNoYW5nZXMgaW4gaXRzIHN0YXRlLiBTd2lwZSBmcm9tIGxlZnQgdG8gb3BlbiBzaWRlIGRyYXdlci5cIjtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBMb2NhdGlvblxuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvblN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBlY2hvIGRhbnMgbGEgcG9ydMOpZVxuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3NQb3J0ZWU6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0UG9ydGVlID0gZWNob3NQb3J0ZWU7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3RQb3J0ZWUgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zUG9ydGVlKCk7XG5cbiAgICAvLyBwZXJtZXQgZGUgc291c2NyaXJlIGF1IFN1YmplY3QgaWUuIMOqdHJlIGluZm9ybcOpIGRlIHRvdXRlIG1vZGlmaWNhdGlvblxuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3M6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0ID0gZWNob3M7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3QgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zKCk7XG5cbiAgICAvLyBjaGFyZ2UgbGVzIGVjaG9zXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKTtcbiAgfVxuXG4gIG9uVmlld0VjaG8oaWRFY2hvKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCcsICd2aWV3JywgaWRFY2hvXSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcblxuICAgIGlmICh0aGlzLmVjaG8udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudHJleiB1biBlY2hvXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgLy8gRGlzbWlzcyB0aGUga2V5Ym9hcmRcbiAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD50aGlzLmVjaG9UZXh0RmllbGQubmF0aXZlRWxlbWVudDtcbiAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuXG4gICAgdmFyIG5ld0VjaG8gPSBuZXcgRWNobygpO1xuICAgIG5ld0VjaG8ubmFtZSA9IHRoaXMuZWNobztcbiAgICBuZXdFY2hvLmRhdGUgPSBEYXRlLm5vdygpO1xuICAgIG5ld0VjaG8ubGF0aXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sYXRpdHVkZTtcbiAgICBuZXdFY2hvLmxvbmdpdHVkZSA9IHRoaXMuY3VycmVudExvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5jcmVhdGVOZXdFY2hvKG5ld0VjaG8pO1xuICB9XG4gIFxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmVjaG9TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5lY2hvUG9ydGVlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvL2FyZ3M6IG9ic2VydmFibGUuRXZlbnREYXRhXG4gIG9uU2hvd0RyYXdlclRhcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRyYXdlciBtZXRob2QgcmVhY2hlZFwiKTtcbiAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgfVxuXG4gIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNsb3NlIHJlYWNoZWRcIik7XG4gICAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICB9XG59XG4iXX0=