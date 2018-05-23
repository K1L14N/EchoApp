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
        this.echoList = [];
        this.echoListPortee = [];
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
        this.refreshList(this.event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRjtBQUVwRixzRUFBbUU7QUFDbkUsNERBQTBEO0FBRzFELGdDQUErQjtBQUMvQiwwQ0FBeUM7QUFDekMsMEVBQXdFO0FBR3hFLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsYUFBYSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFDNUYsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDLENBQUMsaUZBQWlGO0FBQ2pLLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBVXpEO0lBT0E7OzhDQUUwQztJQUV4Qyx1QkFDVSxlQUFnQyxFQUNoQyxXQUF3QixFQUN4QixJQUFVLEVBQ1YsTUFBYyxFQUNkLGtCQUFzQztRQUp0QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBWmhELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7SUFhdkIsQ0FBQztJQUVILGdDQUFRLEdBQVI7UUFBQSxpQkErQkM7UUE5QkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1Qiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUMzRSxVQUFDLFFBQWtCO1lBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2Qzs7Ozs7Ozs7Ozs7Ozs7NENBY29DO1FBRXBDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTthQUM5QixJQUFJLENBQUMsVUFBQyxJQUFJLElBQU8sS0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsTUFBTTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFJRCxtQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsVUFBVSxDQUFDO1lBQ1IsV0FBVyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRTtxREFDNkM7UUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUExRVUsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQztTQUMvQyxDQUFDO3lDQWMyQixtQ0FBZTtZQUNuQiwwQkFBVztZQUNsQixXQUFJO1lBQ0YsZUFBTTtZQUNNLHdDQUFrQjtPQWhCckMsYUFBYSxDQTRFekI7SUFBRCxvQkFBQztDQUFBLEFBNUVELElBNEVDO0FBNUVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEVjaG8gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2VjaG9cIjtcbmltcG9ydCB7IEVjaG9MaXN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfcKgZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2dlb2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xucmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XG5yZWdpc3RlckVsZW1lbnQoXCJGYWJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1mbG9hdGluZ2FjdGlvbmJ1dHRvblwiKS5GYWIpOyAvL0Zsb2F0aW5nIGJ1dHRvbiBodHRwczovL2dpdGh1Yi5jb20vYnJhZG1hcnRpbi9uYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9saXN0Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL2xpc3QtY29tbW9uLmNzc1wiLCBcIi4vbGlzdC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBcbiAgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbjtcbiAgZWNob0xpc3Q6IEVjaG9bXSA9IFtdO1xuICBlY2hvTGlzdFBvcnRlZTogYW55ID0gW107XG4gIGV2ZW50OiBhbnk7XG4vKiBcbiAgZWNob1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBlY2hvUG9ydGVlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247ICovXG4gIFxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UpIHtcbiAgXG4gICAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UuaW5pdFVzZXIoKTtcbiAgICAvLyBlbiBjYXMgZCd1cGRhdGUgZGUgTG9jYXRpb25cbiAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9jYXRpb25TdWJqZWN0LnN1YnNjcmliZShcbiAgICAgIChsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZW1pdExvY2F0aW9uKCk7XG5cbiAgICAvKiAvLyBlbiBjYXMgZCd1cGRhdGUgZGUgZWNobyBkYW5zIGxhIHBvcnTDqWVcbiAgICB0aGlzLmVjaG9Qb3J0ZWVTdWJzY3JpcHRpb24gPSB0aGlzLmVjaG9MaXN0U2VydmljZS5lY2hvc1BvcnRlZVN1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGVjaG9zUG9ydGVlOiBFY2hvW10pID0+IHtcbiAgICAgICAgdGhpcy5lY2hvTGlzdFBvcnRlZSA9IGVjaG9zUG9ydGVlO1xuICAgICAgfSk7XG4gICAgLy8gZmlyZSBsYSBtw6l0aG9kZSAnbmV4dCcgaWUgaW5pdGlhbGlzZSB0aGlzLmVjaG9MaXN0UG9ydGVlIC4uLlxuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVtaXRFY2hvc1BvcnRlZSgpO1xuXG4gICAgLy8gcGVybWV0IGRlIHNvdXNjcmlyZSBhdSBTdWJqZWN0IGllLiDDqnRyZSBpbmZvcm3DqSBkZSB0b3V0ZSBtb2RpZmljYXRpb25cbiAgICB0aGlzLmVjaG9TdWJzY3JpcHRpb24gPSB0aGlzLmVjaG9MaXN0U2VydmljZS5lY2hvc1N1YmplY3Quc3Vic2NyaWJlKFxuICAgICAgKGVjaG9zOiBFY2hvW10pID0+IHtcbiAgICAgICAgdGhpcy5lY2hvTGlzdCA9IGVjaG9zO1xuICAgICAgfSk7XG4gICAgLy8gZmlyZSBsYSBtw6l0aG9kZSAnbmV4dCcgaWUgaW5pdGlhbGlzZSB0aGlzLmVjaG9MaXN0IC4uLlxuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmVtaXRFY2hvcygpOyAqL1xuXG4gICAgLy8gY2hhcmdlIGxlcyBlY2hvc1xuICAgIHRoaXMuZWNob0xpc3RTZXJ2aWNlLmdldEVjaG9zKClcbiAgICAudGhlbigoYXJncykgPT4geyB0aGlzLmVjaG9MaXN0UG9ydGVlID0gW107IHRoaXMuZWNob0xpc3RQb3J0ZWUgPSBhcmdzO30pXG4gIHRoaXMucmVmcmVzaExpc3QodGhpcy5ldmVudCk7XG4gIH1cblxuICBvblZpZXdFY2hvKGlkRWNobykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnLCAndmlldycsIGlkRWNob10pO1xuICB9XG5cbiAgb25UYXBBZGQoKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY3JlYXRlJ10pO1xuICB9XG5cbiAgXG4gIFxuICByZWZyZXNoTGlzdChhcmdzKSB7XG4gICAgdmFyIHB1bGxSZWZyZXNoID0gYXJncy5vYmplY3Q7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLyogdGhpcy5lY2hvU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5lY2hvUG9ydGVlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7ICovXG4gICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==