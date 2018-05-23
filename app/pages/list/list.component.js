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
    /*
      echoSubscription: Subscription;
      echoPorteeSubscription: Subscription; */
    function ListComponent(echoListService, userService, page, router, geolocationService) {
        this.echoListService = echoListService;
        this.userService = userService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        //echoList: Echo[] = [];
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
        /* // en cas d'update de echo dans la portée
        this.echoPorteeSubscription = this.echoListService.echosPorteeSubject.subscribe(
          (echosPortee: Echo[]) => {
            this.echoListPortee = echosPortee;
          });
        // fire la méthode 'next' ie initialise this.echoListPortee ...
        this.echoListService.emitEchosPortee();
    
        // permet de souscrire au Subject ie. être informé de toute modification
        this.echoSubscription = this.echoListService.echosSubject.subscribe(
          (echos: Echo[]) => {
            this.echoList = echos;
          });
        // fire la méthode 'next' ie initialise this.echoList ...
        this.echoListService.emitEchos(); */
        // charge les echos
        this.echoListService.getEchos()
            .then(function (args) {
            _this.echoListPortee = args;
            //this.refreshList(this.event);
        });
    };
    ListComponent.prototype.onViewEcho = function (idEcho) {
        this.router.navigate(['/list', 'view', idEcho]);
    };
    ListComponent.prototype.onTapAdd = function () {
        this.router.navigate(['/create']);
    };
    ListComponent.prototype.refreshList = function (args) {
        var pullRefresh = args.object;
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 1000);
    };
    ListComponent.prototype.ngOnDestroy = function () {
        /* this.echoSubscription.unsubscribe();
        this.echoPorteeSubscription.unsubscribe(); */
        //this.locationSubscription.unsubscribe();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzRUFBbUU7QUFDbkUsNERBQTBEO0FBRzFELGdDQUErQjtBQUMvQiwwQ0FBeUM7QUFDekMsMEVBQXdFO0FBR3hFLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFDNUYsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDLENBQUMsaUZBQWlGO0FBQ2pLLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBVXpEO0lBT0E7OzhDQUUwQztJQUV4Qyx1QkFDVSxlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixJQUFVLEVBQ1YsTUFBYyxFQUNkLGtCQUFzQztRQUp0QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBWmhELHdCQUF3QjtRQUN4QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQVlyQix1RkFBdUY7UUFDdkYsMkNBQTJDO0lBQzdDLENBQUM7SUFFSCxnQ0FBUSxHQUFSO1FBQUEsaUJBaUNDO1FBaENDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDM0UsVUFBQyxRQUFrQjtZQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkM7Ozs7Ozs7Ozs7Ozs7OzRDQWNvQztRQUVwQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7YUFDNUIsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNULEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLCtCQUErQjtRQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFJRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsVUFBVSxDQUFDO1lBQ1IsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRTtxREFDNkM7UUFDN0MsMENBQTBDO0lBQzVDLENBQUM7SUE3RVUsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQztTQUMvQyxDQUFDO3lDQWMyQixtQ0FBZTtZQUNuQiwwQkFBVztZQUNsQixXQUFJO1lBQ0YsZUFBTTtZQUNNLHdDQUFrQjtPQWhCckMsYUFBYSxDQStFekI7SUFBRCxvQkFBQztDQUFBLEFBL0VELElBK0VDO0FBL0VZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEVjaG8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2VjaG9cIjtcbmltcG9ydCB7IEVjaG9MaXN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfcKgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpOyAvL0Zsb2F0aW5nIGJ1dHRvbiBodHRwczovL2dpdGh1Yi5jb20vYnJhZG1hcnRpbi9uYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9saXN0Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2xpc3QtY29tbW9uLmNzc1wiLCBcIi4vbGlzdC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBcbiAgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbjtcbiAgLy9lY2hvTGlzdDogRWNob1tdID0gW107XG4gIGVjaG9MaXN0UG9ydGVlOiBhbnkgPSBbXTtcbiAgZXZlbnQ6IGFueTtcbi8qIFxuICBlY2hvU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGVjaG9Qb3J0ZWVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjsgKi9cbiAgXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWNob0xpc3RTZXJ2aWNlOiBFY2hvTGlzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSkge1xuICAgICAgLy90aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFeHBpcmVkRWNobygpLnRoZW4oKGlkcykgPT4geyBjb25zb2xlLmxvZyhcImlkcyA6IFwiICsgaWRzKTt9KTtcbiAgICAgIC8vdGhpcy5lY2hvTGlzdFNlcnZpY2UucmVtb3ZlRXhwaXJlZEVjaG8oKTtcbiAgICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5pbml0VXNlcigpO1xuICAgIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBMb2NhdGlvblxuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvblN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblxuICAgIC8qIC8vIGVuIGNhcyBkJ3VwZGF0ZSBkZSBlY2hvIGRhbnMgbGEgcG9ydMOpZVxuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zUG9ydGVlU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3NQb3J0ZWU6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0UG9ydGVlID0gZWNob3NQb3J0ZWU7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3RQb3J0ZWUgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zUG9ydGVlKCk7XG5cbiAgICAvLyBwZXJtZXQgZGUgc291c2NyaXJlIGF1IFN1YmplY3QgaWUuIMOqdHJlIGluZm9ybcOpIGRlIHRvdXRlIG1vZGlmaWNhdGlvblxuICAgIHRoaXMuZWNob1N1YnNjcmlwdGlvbiA9IHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVjaG9zU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAoZWNob3M6IEVjaG9bXSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0ID0gZWNob3M7XG4gICAgICB9KTtcbiAgICAvLyBmaXJlIGxhIG3DqXRob2RlICduZXh0JyBpZSBpbml0aWFsaXNlIHRoaXMuZWNob0xpc3QgLi4uXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZW1pdEVjaG9zKCk7ICovXG5cbiAgICAvLyBjaGFyZ2UgbGVzIGVjaG9zXG4gICAgdGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKVxuICAgICAgLnRoZW4oKGFyZ3MpID0+IHsgXG4gICAgICAgIHRoaXMuZWNob0xpc3RQb3J0ZWUgPSBhcmdzO1xuICAgICAgICAvL3RoaXMucmVmcmVzaExpc3QodGhpcy5ldmVudCk7XG4gICAgICB9KVxuICB9XG5cbiAgb25WaWV3RWNobyhpZEVjaG8pIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0JywgJ3ZpZXcnLCBpZEVjaG9dKTtcbiAgfVxuXG4gIG9uVGFwQWRkKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NyZWF0ZSddKTtcbiAgfVxuXG4gIFxuICBcbiAgcmVmcmVzaExpc3QoYXJncykge1xuICAgIHZhciBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8qIHRoaXMuZWNob1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZWNob1BvcnRlZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyAqL1xuICAgIC8vdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==