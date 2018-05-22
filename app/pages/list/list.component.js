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
        var _this = this;
        this.echoListService = echoListService;
        this.userService = userService;
        this.page = page;
        this.router = router;
        this.geolocationService = geolocationService;
        this.echoList = [];
        this.echoListPortee = [];
        setTimeout(function () {
            _this.echoListService.getEchos().then(function () {
                _this.echoListPortee = _this.echoListService.echosPortee;
            });
        }, 1000);
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
            .then(function (args) { _this.echoListPortee = []; _this.echoListPortee = args; });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzRUFBbUU7QUFDbkUsNERBQTBEO0FBRzFELGdDQUErQjtBQUMvQiwwQ0FBeUM7QUFDekMsMEVBQXdFO0FBR3hFLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFDNUYsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDLENBQUMsaUZBQWlGO0FBQ2pLLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBVXpEO0lBTUE7OzhDQUUwQztJQUV4Qyx1QkFDVSxlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixJQUFVLEVBQ1YsTUFBYyxFQUNkLGtCQUFzQztRQUxoRCxpQkFXRztRQVZPLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFYaEQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQVdyQixVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDbkMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFSCxnQ0FBUSxHQUFSO1FBQUEsaUJBK0JDO1FBOUJDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDM0UsVUFBQyxRQUFrQjtZQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkM7Ozs7Ozs7Ozs7Ozs7OzRDQWNvQztRQUVwQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7YUFDOUIsSUFBSSxDQUFDLFVBQUMsSUFBSSxJQUFPLEtBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQTtJQUUzRSxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLE1BQU07UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBSUQsbUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzlCLFVBQVUsQ0FBQztZQUNSLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0U7cURBQzZDO1FBQzdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBN0VVLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsYUFBYTtZQUMxQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUM7U0FDL0MsQ0FBQzt5Q0FhMkIsbUNBQWU7WUFDbkIsMEJBQVc7WUFDbEIsV0FBSTtZQUNGLGVBQU07WUFDTSx3Q0FBa0I7T0FmckMsYUFBYSxDQStFekI7SUFBRCxvQkFBQztDQUFBLEFBL0VELElBK0VDO0FBL0VZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEVjaG8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2VjaG9cIjtcbmltcG9ydCB7IEVjaG9MaXN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfcKgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpOyAvL0Zsb2F0aW5nIGJ1dHRvbiBodHRwczovL2dpdGh1Yi5jb20vYnJhZG1hcnRpbi9uYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9saXN0Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2xpc3QtY29tbW9uLmNzc1wiLCBcIi4vbGlzdC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBcbiAgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbjtcbiAgZWNob0xpc3Q6IEVjaG9bXSA9IFtdO1xuICBlY2hvTGlzdFBvcnRlZTogYW55ID0gW107XG4vKiBcbiAgZWNob1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBlY2hvUG9ydGVlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247ICovXG4gIFxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFY2hvcygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWNob0xpc3RQb3J0ZWUgPSB0aGlzLmVjaG9MaXN0U2VydmljZS5lY2hvc1BvcnRlZTtcbiAgICAgICAgfSlcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmluaXRVc2VyKCk7XG4gICAgLy8gZW4gY2FzIGQndXBkYXRlIGRlIExvY2F0aW9uXG4gICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvY2F0aW9uU3ViamVjdC5zdWJzY3JpYmUoXG4gICAgICAobG9jYXRpb246IExvY2F0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmVtaXRMb2NhdGlvbigpO1xuXG4gICAgLyogLy8gZW4gY2FzIGQndXBkYXRlIGRlIGVjaG8gZGFucyBsYSBwb3J0w6llXG4gICAgdGhpcy5lY2hvUG9ydGVlU3Vic2NyaXB0aW9uID0gdGhpcy5lY2hvTGlzdFNlcnZpY2UuZWNob3NQb3J0ZWVTdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChlY2hvc1BvcnRlZTogRWNob1tdKSA9PiB7XG4gICAgICAgIHRoaXMuZWNob0xpc3RQb3J0ZWUgPSBlY2hvc1BvcnRlZTtcbiAgICAgIH0pO1xuICAgIC8vIGZpcmUgbGEgbcOpdGhvZGUgJ25leHQnIGllIGluaXRpYWxpc2UgdGhpcy5lY2hvTGlzdFBvcnRlZSAuLi5cbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5lbWl0RWNob3NQb3J0ZWUoKTtcblxuICAgIC8vIHBlcm1ldCBkZSBzb3VzY3JpcmUgYXUgU3ViamVjdCBpZS4gw6p0cmUgaW5mb3Jtw6kgZGUgdG91dGUgbW9kaWZpY2F0aW9uXG4gICAgdGhpcy5lY2hvU3Vic2NyaXB0aW9uID0gdGhpcy5lY2hvTGlzdFNlcnZpY2UuZWNob3NTdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChlY2hvczogRWNob1tdKSA9PiB7XG4gICAgICAgIHRoaXMuZWNob0xpc3QgPSBlY2hvcztcbiAgICAgIH0pO1xuICAgIC8vIGZpcmUgbGEgbcOpdGhvZGUgJ25leHQnIGllIGluaXRpYWxpc2UgdGhpcy5lY2hvTGlzdCAuLi5cbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5lbWl0RWNob3MoKTsgKi9cblxuICAgIC8vIGNoYXJnZSBsZXMgZWNob3NcbiAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFY2hvcygpXG4gICAgLnRoZW4oKGFyZ3MpID0+IHsgdGhpcy5lY2hvTGlzdFBvcnRlZSA9IFtdOyB0aGlzLmVjaG9MaXN0UG9ydGVlID0gYXJnczt9KVxuXG4gIH1cblxuICBvblZpZXdFY2hvKGlkRWNobykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnLCAndmlldycsIGlkRWNob10pO1xuICB9XG5cbiAgb25UYXBBZGQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3JlYXRlJ10pO1xuICB9XG5cbiAgXG4gIFxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLyogdGhpcy5lY2hvU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5lY2hvUG9ydGVlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7ICovXG4gICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==