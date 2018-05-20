"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_1 = require("../../models/echo");
var echo_list_service_1 = require("../../services/echo-list.service");
var user_service_1 = require("../../services/user.service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1SDtBQUN2SCwwQ0FBeUM7QUFDekMsc0VBQW1FO0FBQ25FLDREQUEwRDtBQUcxRCxnQ0FBK0I7QUFDL0IsMENBQXlDO0FBQ3pDLDBFQUF3RTtBQUd4RSw4REFBNEY7QUFHNUYsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsb0NBQXNDO0FBU3RDO0lBbUJFLHVCQUFvQixlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixJQUFVLEVBQ1YsTUFBYyxFQUNkLGtCQUFzQyxFQUN0QyxpQkFBb0M7UUFMcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkJ4RCxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUs5QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBSzVCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFhRyxDQUFDO0lBRWQsdUNBQWUsR0FBZjtRQUNFLFlBQVk7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQThCQztRQTdCQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUMzRSxVQUFDLFFB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LENBQUMsQ0FBQztnQkFDWCxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUExSTJCO1FBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDO2tDQUFnQixpQkFBVTt3REFBQztJQUkzQjtRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBeUIsZ0NBQXNCOzBEQUFDO0lBakIvRCxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO1NBQy9DLENBQUM7eUNBcUJxQyxtQ0FBZTtZQUNuQiwwQkFBVztZQUNsQixXQUFJO1lBQ0YsZUFBTTtZQUNNLHdDQUFrQjtZQUNuQix3QkFBaUI7T0F4QjdDLGFBQWEsQ0F5SnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXpKRCxJQXlKQztBQXpKWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEVjaG8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2VjaG9cIjtcbmltcG9ydCB7IEVjaG9MaXN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfcKgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXInO1xuXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGlzdFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbGlzdC1jb21tb24uY3NzXCIsIFwiLi9saXN0LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHNpZGVkcmF3ZXJPbjogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIGxvY2F0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGN1cnJlbnRMb2NhdGlvbjogTG9jYXRpb247XG5cbiAgZWNob0xpc3Q6IEVjaG9bXSA9IFtdO1xuICBlY2hvTGlzdFBvcnRlZTogRWNob1tdID0gW107XG5cbiAgZWNob1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBlY2hvUG9ydGVlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgZWNobyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJlY2hvVGV4dEZpZWxkXCIpIGVjaG9UZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG5cbiAgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuIFxuICBAVmlld0NoaWxkKFwic2lkZWRyYXdlcklkXCIpIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikgXG4gICAgICAgICAgICAgIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIGR1cGxpY2F0ZVxuICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBMb2NhdGlvblxuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvblN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBlY2hvIGRhbnMgbGEgcG9ydMOpZVxuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3NQb3J0ZWU6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0UG9ydGVlID0gZWNob3NQb3J0ZWU7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3RQb3J0ZWUgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zUG9ydGVlKCk7XG5cbiAgICAvLyBwZXJtZXQgZGUgc291c2NyaXJlIGF1IFN1YmplY3QgaWUuIMOqdHJlIGluZm9ybcOpIGRlIHRvdXRlIG1vZGlmaWNhdGlvblxuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3M6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0ID0gZWNob3M7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3QgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zKCk7XG5cbiAgICAvLyBjaGFyZ2UgbGVzIGVjaG9zXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKTtcblxuICAgIFxuICB9XG5cbiAgb25WaWV3RWNobyhpZEVjaG8pIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0JywgJ3ZpZXcnLCBpZEVjaG9dKTtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuZWNoby50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiRW50cmV6IHVuIGVjaG9cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICAvLyBEaXNtaXNzIHRoZSBrZXlib2FyZFxuICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZWNob1RleHRGaWVsZC5uYXRpdmVFbGVtZW50O1xuICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG5cbiAgICB2YXIgbmV3RWNobyA9IG5ldyBFY2hvKCk7XG4gICAgbmV3RWNoby5uYW1lID0gdGhpcy5lY2hvO1xuICAgIG5ld0VjaG8uZGF0ZSA9IERhdGUubm93KCk7XG4gICAgbmV3RWNoby5sYXRpdHVkZSA9IHRoaXMuY3VycmVudExvY2F0aW9uLmxhdGl0dWRlO1xuICAgIG5ld0VjaG8ubG9uZ2l0dWRlID0gdGhpcy5jdXJyZW50TG9jYXRpb24ubG9uZ2l0dWRlO1xuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmNyZWF0ZU5ld0VjaG8obmV3RWNobyk7XG4gIH1cbiAgXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmVjaG9Qb3J0ZWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHRvZ2dsZURyYXdlcigpIHtcbiAgICBpZiAodGhpcy5zaWRlZHJhd2VyT24pIHtcbiAgICAgIHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uU2hvd0RyYXdlclRhcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vYXJnczogb2JzZXJ2YWJsZS5FdmVudERhdGFcbiAgb25TaG93RHJhd2VyVGFwKCkge1xuICAgIC8vY29uc29sZS5sb2coXCJEcmF3ZXIgbWV0aG9kIHJlYWNoZWRcIik7XG4gICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIHRoaXMuc2lkZWRyYXdlck9uID0gIXRoaXMuc2lkZWRyYXdlck9uO1xuICB9XG5cbiAgb25DbG9zZURyYXdlclRhcCgpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiQ2xvc2UgcmVhY2hlZFwiKTtcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIHRoaXMuc2lkZWRyYXdlck9uID0gIXRoaXMuc2lkZWRyYXdlck9uO1xuICB9XG5cbiAgb25UYXBBY3R1KCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG4gICAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG4gIH1cblxuICBvblRhcENvbnRhY3RzKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG4gICAgdGhpcy5vbkNsb3NlRHJhd2VyVGFwKCk7XG4gIH1cblxuICBvblRhcFByb2ZpbCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0J10pO1xuICAgIHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuICB9XG5cbiAgb25UYXBBYm91dCgpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0J10pO1xuICAgIHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuICB9XG5cbiAgb25UYXBMb2dvdXQoKSB7XG4gICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgdGl0bGU6IFwiRMOpY29ubmVjdGlvbiBlbiBjb3Vyc1wiLFxuICAgICAgICBtZXNzYWdlOiBcIlZvdWxlei12b3VzIHZyYWltZW50IHZvdXMgZMOpY29ubmVjdGVyID9cIixcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk91aVwiLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkFubnVsZXJcIlxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG4gICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS5zaWduT3V0VXNlcigpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG4gICAgICAgIHRoaXMub25DbG9zZURyYXdlclRhcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==