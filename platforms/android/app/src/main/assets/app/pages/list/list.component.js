"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_list_service_1 = require("../../services/echo-list.service");
var user_service_1 = require("../../services/user.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var geolocation_service_1 = require("../../services/geolocation.service");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; }); //Floating button https://github.com/bradmartin/nativescript-floatingactionbutton
var firebase = require("nativescript-plugin-firebase");
var ListComponent = /** @class */ (function () {
    /* echoSubscription: Subscription;
    echoPorteeSubscription: Subscription; */
    function ListComponent(echoListService, userService, page, router, geolocationService) {
        this.echoListService = echoListService;
        this.userService = userService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        this.echoList = [];
        this.echoListPortee = [];
        //this.echoListService.getExpiredEcho().then((ids) => { console.log("ids : " + ids);});
        //this.echoListService.removeExpiredEcho();
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
        /* this.echoPorteeSubscription = this.echoListService.echosPorteeSubject.subscribe(
          (echosPortee: Echo[]) => {
            this.echoListPortee = echosPortee;
          }); */
        // fire la méthode 'next' ie initialise this.echoListPortee ...
        //this.echoListService.emitEchosPortee();
        // permet de souscrire au Subject ie. être informé de toute modification
        /* this.echoSubscription = this.echoListService.echosSubject.subscribe(
          (echos: Echo[]) => {
            this.echoList = echos;
          }); */
        // fire la méthode 'next' ie initialise this.echoList ...
        //this.echoListService.emitEchos();
        // charge les echos
        this.echoListService.getEchos();
        /* .then(() => {
          this.refreshList(this.event);
        }) */
    };
    ListComponent.prototype.onViewEcho = function (idEcho) {
        this.router.navigate(['/list', 'view', idEcho]);
    };
    ListComponent.prototype.onTapAdd = function () {
        this.router.navigate(['/create']);
    };
    ListComponent.prototype.refreshList = function (args) {
        var _this = this;
        var pullRefresh = args.object;
        this.echoListService.getEchosRange().then(function () {
            _this.echoListPortee = _this.echoListService.echosPortee;
        });
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    ListComponent.prototype.ngOnDestroy = function () {
        //this.echoSubscription.unsubscribe();
        //this.echoPorteeSubscription.unsubscribe();
        this.locationSubscription.unsubscribe();
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzRUFBbUU7QUFDbkUsNERBQTBEO0FBRzFELGdDQUErQjtBQUMvQiwwQ0FBeUM7QUFDekMsMEVBQXdFO0FBR3hFLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFDNUYsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDLENBQUMsaUZBQWlGO0FBQ2pLLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBVXpEO0lBUUU7NENBQ3dDO0lBRXhDLHVCQUNVLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLElBQVUsRUFDVixNQUFjLEVBQ2Qsa0JBQXNDO1FBSnRDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFaaEQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQVlyQix1RkFBdUY7UUFDdkYsMkNBQTJDO0lBQzdDLENBQUM7SUFFSCxnQ0FBUSxHQUFSO1FBQUEsaUJBbUNDO1FBbENDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDM0UsVUFBQyxRQUFrQjtZQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkMseUNBQXlDO1FBQ3pDOzs7Z0JBR1E7UUFDUiwrREFBK0Q7UUFDL0QseUNBQXlDO1FBRXpDLHdFQUF3RTtRQUN4RTs7O2dCQUdRO1FBQ1IseURBQXlEO1FBQ3pELG1DQUFtQztRQUVuQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUk5Qjs7YUFFSztJQUNULENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFJRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUFoQixpQkFTQztRQVJDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQTtRQUVGLFVBQVUsQ0FBQztZQUNSLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0Usc0NBQXNDO1FBQ3RDLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQW5GVSxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDO1NBQy9DLENBQUM7eUNBYzJCLG1DQUFlO1lBQ25CLDBCQUFXO1lBQ2xCLFdBQUk7WUFDRixlQUFNO1lBQ00sd0NBQWtCO09BaEJyQyxhQUFhLENBcUZ6QjtJQUFELG9CQUFDO0NBQUEsQUFyRkQsSUFxRkM7QUFyRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZWNob1wiO1xuaW1wb3J0IHsgRWNob0xpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2VjaG8tbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICduYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJQdWxsVG9SZWZyZXNoXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcHVsbHRvcmVmcmVzaFwiKS5QdWxsVG9SZWZyZXNoKTtcbnJlZ2lzdGVyRWxlbWVudChcIkZhYlwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZsb2F0aW5nYWN0aW9uYnV0dG9uXCIpLkZhYik7IC8vRmxvYXRpbmcgYnV0dG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9icmFkbWFydGluL25hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGlzdFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vbGlzdC1jb21tb24uY3NzXCIsIFwiLi9saXN0LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIFxuICBsb2NhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBjdXJyZW50TG9jYXRpb246IExvY2F0aW9uO1xuICBlY2hvTGlzdDogRWNob1tdID0gW107XG4gIGVjaG9MaXN0UG9ydGVlOiBhbnkgPSBbXTtcbiAgZXZlbnQ6IGFueTtcblxuICAvKiBlY2hvU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGVjaG9Qb3J0ZWVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjsgKi9cbiAgXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWNob0xpc3RTZXJ2aWNlOiBFY2hvTGlzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSkge1xuICAgICAgLy90aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFeHBpcmVkRWNobygpLnRoZW4oKGlkcykgPT4geyBjb25zb2xlLmxvZyhcImlkcyA6IFwiICsgaWRzKTt9KTtcbiAgICAgIC8vdGhpcy5lY2hvTGlzdFNlcnZpY2UucmVtb3ZlRXhwaXJlZEVjaG8oKTtcbiAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5pbml0VXNlcigpO1xuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBMb2NhdGlvblxuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvblN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblxuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBlY2hvIGRhbnMgbGEgcG9ydMOpZVxuICAgIC8qIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3NQb3J0ZWU6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0UG9ydGVlID0gZWNob3NQb3J0ZWU7XG4gICAgICB9KTsgKi9cbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3RQb3J0ZWUgLi4uXG4gICAgLy90aGlzLmVjaG9MaXN0U2VydmljZS5lbWl0RWNob3NQb3J0ZWUoKTtcblxuICAgIC8vIHBlcm1ldCBkZSBzb3VzY3JpcmUgYXUgU3ViamVjdCBpZS4gw6p0cmUgaW5mb3Jtw6kgZGUgdG91dGUgbW9kaWZpY2F0aW9uXG4gICAgLyogdGhpcy5lY2hvU3Vic2NyaXB0aW9uID0gdGhpcy5lY2hvTGlzdFNlcnZpY2UuZWNob3NTdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChlY2hvczogRWNob1tdKSA9PiB7XG4gICAgICAgIHRoaXMuZWNob0xpc3QgPSBlY2hvcztcbiAgICAgIH0pOyAqL1xuICAgIC8vIGZpcmUgbGEgbcOpdGhvZGUgJ25leHQnIGllIGluaXRpYWxpc2UgdGhpcy5lY2hvTGlzdCAuLi5cbiAgICAvL3RoaXMuZWNob0xpc3RTZXJ2aWNlLmVtaXRFY2hvcygpO1xuXG4gICAgLy8gY2hhcmdlIGxlcyBlY2hvc1xuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmdldEVjaG9zKCk7XG4gICAgXG4gICAgXG5cbiAgICAgIC8qIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoTGlzdCh0aGlzLmV2ZW50KTtcbiAgICAgIH0pICovXG4gIH1cblxuICBvblZpZXdFY2hvKGlkRWNobykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnLCAndmlldycsIGlkRWNob10pO1xuICB9XG5cbiAgb25UYXBBZGQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3JlYXRlJ10pO1xuICB9XG5cbiAgXG4gIFxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3NSYW5nZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5lY2hvTGlzdFBvcnRlZSA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlO1xuICAgIH0pXG4gICAgXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy90aGlzLmVjaG9TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAvL3RoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=