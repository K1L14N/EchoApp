"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_1 = require("../../shared/echo/echo");
var echo_list_service_1 = require("../../shared/echo/echo-list.service");
var user_service_1 = require("../../shared/user/user.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var geolocation_service_1 = require("../../services/geolocation.service");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var firebase = require("nativescript-plugin-firebase");
var dialogs = require("ui/dialogs");
var ListComponent = /** @class */ (function () {
    function ListComponent(echoListService, userService, page, router, geolocationService, changeDetectorRef) {
        this.echoListService = echoListService;
        this.userService = userService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        this.changeDetectorRef = changeDetectorRef;
        this.sidedrawerOn = false;
        this.echoList = [];
        this.echoListPortee = [];
        this.echo = "";
    }
    ListComponent.prototype.ngAfterViewInit = function () {
        // duplicate
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectorRef.detectChanges();
    };
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
    ListComponent.prototype.toggleDrawer = function () {
        if (this.sidedrawerOn) {
            this.onCloseDrawerTap();
        }
        else {
            this.onShowDrawerTap();
        }
    };
    //args: observable.EventData
    ListComponent.prototype.onShowDrawerTap = function () {
        //console.log("Drawer method reached");
        this.drawer.showDrawer();
        this.sidedrawerOn = !this.sidedrawerOn;
    };
    ListComponent.prototype.onCloseDrawerTap = function () {
        //console.log("Close reached");
        this.drawer.closeDrawer();
        this.sidedrawerOn = !this.sidedrawerOn;
    };
    ListComponent.prototype.onTapActu = function () {
        this.router.navigate(['/list']);
        this.onCloseDrawerTap();
    };
    ListComponent.prototype.onTapContacts = function () {
        this.router.navigate(['/list']);
        this.onCloseDrawerTap();
    };
    ListComponent.prototype.onTapProfil = function () {
        this.router.navigate(['/list']);
        this.onCloseDrawerTap();
    };
    ListComponent.prototype.onTapAbout = function () {
        this.router.navigate(['/list']);
        this.onCloseDrawerTap();
    };
    ListComponent.prototype.onTapLogout = function () {
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
        core_1.ViewChild("echoTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], ListComponent.prototype, "echoTextField", void 0);
    __decorate([
        core_1.ViewChild("sidedrawerId"),
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
            user_service_1.UserService,
            page_1.Page,
            router_1.Router,
            geolocation_service_1.GeolocationService,
            core_1.ChangeDetectorRef])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1SDtBQUN2SCwrQ0FBOEM7QUFDOUMseUVBQXNFO0FBQ3RFLCtEQUE2RDtBQUc3RCxnQ0FBK0I7QUFDL0IsMENBQXlDO0FBQ3pDLDBFQUF3RTtBQUd4RSw4REFBNEY7QUFHNUYsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsb0NBQXNDO0FBU3RDO0lBbUJFLHVCQUFvQixlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixJQUFVLEVBQ1YsTUFBYyxFQUNkLGtCQUFzQyxFQUN0QyxpQkFBb0M7UUFMcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkJ4RCxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUs5QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBSzVCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFhRyxDQUFDO0lBRWQsdUNBQWUsR0FBZjtRQUNFLFlBQVk7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQThCQztRQTdCQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUMzRSxVQUFDLFFB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LENBQUMsQ0FBQztnQkFDWCxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUExSTJCO1FBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDO2tDQUFnQixpQkFBVTt3REFBQztJQUkzQjtRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBeUIsZ0NBQXNCOzBEQUFDO0lBakIvRCxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO1NBQy9DLENBQUM7eUNBcUJxQyxtQ0FBZTtZQUNuQiwwQkFBVztZQUNsQixXQUFJO1lBQ0YsZUFBTTtZQUNNLHdDQUFrQjtZQUNuQix3QkFBaUI7T0F4QjdDLGFBQWEsQ0F5SnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXpKRCxJQXlKQztBQXpKWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEVjaG8gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2VjaG8vZWNob1wiO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9lY2hvL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXNlci91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaXN0XCIsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiBcIi4vbGlzdC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9saXN0LWNvbW1vbi5jc3NcIiwgXCIuL2xpc3QuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgc2lkZWRyYXdlck9uOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbjtcblxuICBlY2hvTGlzdDogRWNob1tdID0gW107XG4gIGVjaG9MaXN0UG9ydGVlOiBFY2hvW10gPSBbXTtcblxuICBlY2hvU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGVjaG9Qb3J0ZWVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBlY2hvID0gXCJcIjtcbiAgQFZpZXdDaGlsZChcImVjaG9UZXh0RmllbGRcIikgZWNob1RleHRGaWVsZDogRWxlbWVudFJlZjtcblxuICBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG4gXG4gIEBWaWV3Q2hpbGQoXCJzaWRlZHJhd2VySWRcIikgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWNob0xpc3RTZXJ2aWNlOiBFY2hvTGlzdFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSBcbiAgICAgICAgICAgICAge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gZHVwbGljYXRlXG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gZW4gY2FzIGQndXBkYXRlIGRlIExvY2F0aW9uXG4gICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvY2F0aW9uU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAobG9jYXRpb246IExvY2F0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmVtaXRMb2NhdGlvbigpO1xuXG4gICAgLy8gZW4gY2FzIGQndXBkYXRlIGRlIGVjaG8gZGFucyBsYSBwb3J0w6llXG4gICAgdGhpcy5lY2hvUG9ydGVlU3Vic2NyaXB0aW9uID0gdGhpcy5lY2hvTGlzdFNlcnZpY2UuZWNob3NQb3J0ZWVTdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChlY2hvc1BvcnRlZTogRWNob1tdKSA9PiB7XG4gICAgICAgIHRoaXMuZWNob0xpc3RQb3J0ZWUgPSBlY2hvc1BvcnRlZTtcbiAgICAgIH0pO1xuICAgIC8vIGZpcmUgbGEgbcOpdGhvZGUgJ25leHQnIGllIGluaXRpYWxpc2UgdGhpcy5lY2hvTGlzdFBvcnRlZSAuLi5cbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5lbWl0RWNob3NQb3J0ZWUoKTtcblxuICAgIC8vIHBlcm1ldCBkZSBzb3VzY3JpcmUgYXUgU3ViamVjdCBpZS4gw6p0cmUgaW5mb3Jtw6kgZGUgdG91dGUgbW9kaWZpY2F0aW9uXG4gICAgdGhpcy5lY2hvU3Vic2NyaXB0aW9uID0gdGhpcy5lY2hvTGlzdFNlcnZpY2UuZWNob3NTdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChlY2hvczogRWNob1tdKSA9PiB7XG4gICAgICAgIHRoaXMuZWNob0xpc3QgPSBlY2hvcztcbiAgICAgIH0pO1xuICAgIC8vIGZpcmUgbGEgbcOpdGhvZGUgJ25leHQnIGllIGluaXRpYWxpc2UgdGhpcy5lY2hvTGlzdCAuLi5cbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5lbWl0RWNob3MoKTtcblxuICAgIC8vIGNoYXJnZSBsZXMgZWNob3NcbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFY2hvcygpO1xuXG4gICAgXG4gIH1cblxuICBvblZpZXdFY2hvKGlkRWNobykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnLCAndmlldycsIGlkRWNob10pO1xuICB9XG5cbiAgYWRkKCkge1xuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5lY2hvLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgYWxlcnQoXCJFbnRyZXogdW4gZWNob1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIC8vIERpc21pc3MgdGhlIGtleWJvYXJkXG4gICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+dGhpcy5lY2hvVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgIHZhciBuZXdFY2hvID0gbmV3IEVjaG8oKTtcbiAgICBuZXdFY2hvLm5hbWUgPSB0aGlzLmVjaG87XG4gICAgbmV3RWNoby5kYXRlID0gRGF0ZS5ub3coKTtcbiAgICBuZXdFY2hvLmxhdGl0dWRlID0gdGhpcy5jdXJyZW50TG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgbmV3RWNoby5sb25naXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuY3JlYXRlTmV3RWNobyhuZXdFY2hvKTtcbiAgfVxuICBcbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5lY2hvU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgdG9nZ2xlRHJhd2VyKCkge1xuICAgIGlmICh0aGlzLnNpZGVkcmF3ZXJPbikge1xuICAgICAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25TaG93RHJhd2VyVGFwKCk7XG4gICAgfVxuICB9XG5cbiAgLy9hcmdzOiBvYnNlcnZhYmxlLkV2ZW50RGF0YVxuICBvblNob3dEcmF3ZXJUYXAoKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIkRyYXdlciBtZXRob2QgcmVhY2hlZFwiKTtcbiAgICB0aGlzLmRyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgdGhpcy5zaWRlZHJhd2VyT24gPSAhdGhpcy5zaWRlZHJhd2VyT247XG4gIH1cblxuICBvbkNsb3NlRHJhd2VyVGFwKCkge1xuICAgIC8vY29uc29sZS5sb2coXCJDbG9zZSByZWFjaGVkXCIpO1xuICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgdGhpcy5zaWRlZHJhd2VyT24gPSAhdGhpcy5zaWRlZHJhd2VyT247XG4gIH1cblxuICBvblRhcEFjdHUoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCddKTtcbiAgICB0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcbiAgfVxuXG4gIG9uVGFwQ29udGFjdHMoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCddKTtcbiAgICB0aGlzLm9uQ2xvc2VEcmF3ZXJUYXAoKTtcbiAgfVxuXG4gIG9uVGFwUHJvZmlsKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG4gICAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG4gIH1cblxuICBvblRhcEFib3V0KCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG4gICAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG4gIH1cblxuICBvblRhcExvZ291dCgpIHtcbiAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogXCJEw6ljb25uZWN0aW9uIGVuIGNvdXJzXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiVm91bGV6LXZvdXMgdnJhaW1lbnQgdm91cyBkw6ljb25uZWN0ZXIgP1wiLFxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT3VpXCIsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQW5udWxlclwiXG4gICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cbiAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnNpZ25PdXRVc2VyKCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19