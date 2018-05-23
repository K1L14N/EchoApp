"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echo_list_service_1 = require("../../services/echo-list.service");
var echo_1 = require("../../models/echo");
var geolocation_service_1 = require("../../services/geolocation.service");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var camera = require("nativescript-camera");
var image_1 = require("ui/image");
var dialogs = require("ui/dialogs");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(echoListService, geolocationService, page, router) {
        this.echoListService = echoListService;
        this.geolocationService = geolocationService;
        this.page = page;
        this.router = router;
        this.echo = "";
    }
    CreateComponent.prototype.ngOnInit = function () {
        camera.requestPermissions();
    };
    CreateComponent.prototype.add = function () {
        var _this = this;
        if (this.echo.trim() === "") {
            alert("Entrez un echo");
            return;
        }
        this.geolocationService.updateLocation();
        this.locationSubscription = this.geolocationService.locationSubject.subscribe(function (location) {
            _this.currentLocation = location;
        });
        this.geolocationService.updateLocation();
        this.geolocationService.emitLocation();
        var newEcho = new echo_1.Echo();
        newEcho.name = this.echo;
        newEcho.date = Date.now();
        newEcho.latitude = this.currentLocation.latitude;
        newEcho.longitude = this.currentLocation.longitude;
        if (this.imageSrc) {
            this.echoListService.uploadFile(this.imageSrc)
                .then(function (urlPicture) {
                newEcho.img = urlPicture;
                _this.echoListService.getEchos().then(function () {
                    _this.echoListService.createNewEcho(newEcho);
                    _this.router.navigate(['/list']);
                });
            });
        }
        else {
            this.echoListService.getEchos().then(function () {
                _this.echoListService.createNewEcho(newEcho);
                _this.router.navigate(['/list']);
            });
        }
    };
    CreateComponent.prototype.onTapDelete = function () {
        var _this = this;
        dialogs.confirm({
            title: "Vous allez perdre l'image",
            message: "Confirmer ?",
            okButtonText: "Oui",
            cancelButtonText: "Annuler"
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result) {
                _this.image = null;
                _this.imageSrc = null;
            }
        });
    };
    CreateComponent.prototype.takePicture = function () {
        var _this = this;
        var options = {
            width: 500,
            keepAspectRatio: true,
            saveToGallery: true
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            console.log("Result is an image asset instance");
            _this.image = new image_1.Image();
            _this.image.src = imageAsset;
            _this.imageSrc = _this.image.src._android;
            //console.log(this.imageSrc);
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    __decorate([
        core_1.ViewChild("echoTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], CreateComponent.prototype, "echoTextField", void 0);
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'create',
            moduleId: module.id,
            templateUrl: './create.component.html',
            styleUrls: ['./create.component.css'],
            providers: [echo_list_service_1.EchoListService]
        }),
        __metadata("design:paramtypes", [echo_list_service_1.EchoListService,
            geolocation_service_1.GeolocationService,
            page_1.Page,
            router_1.Router])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDBDQUF5QztBQUV6QywwRUFBd0U7QUFDeEUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUl6Qyw0Q0FBOEM7QUFDOUMsa0NBQWlDO0FBQ2pDLG9DQUFzQztBQVd0QztJQVNDLHlCQUNTLGVBQWdDLEVBQ2hDLGtCQUFzQyxFQUN0QyxJQUFVLEVBQ1YsTUFBYztRQUhkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVHZCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFTaUIsQ0FBQztJQUU1QixrQ0FBUSxHQUFSO1FBQ0MsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFHLEdBQUg7UUFBQSxpQkFtQ0M7UUFsQ0EsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUM1RSxVQUFDLFFBQWtCO1lBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUMsQ0FDQyxDQUFDO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6QixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFFbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDN0MsSUFBSSxDQUFDLFVBQUMsVUFBVTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNwQyxLQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0YsQ0FBQztJQUdELHFDQUFXLEdBQVg7UUFBQSxpQkFjQztRQWJBLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDZixLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFlBQVksRUFBRSxLQUFLO1lBQ25CLGdCQUFnQixFQUFFLFNBQVM7U0FDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDYiw2QkFBNkI7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUFBLGlCQWdCRTtRQWZELElBQUksT0FBTyxHQUFHO1lBQ2IsS0FBSyxFQUFFLEdBQUc7WUFDVixlQUFlLEVBQUUsSUFBSTtZQUNyQixhQUFhLEVBQUUsSUFBSTtTQUNuQixDQUFDO1FBQ0EsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7YUFDMUIsSUFBSSxDQUFDLFVBQUMsVUFBVTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNqRCxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7WUFDN0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1lBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ3hDLDZCQUE2QjtRQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXBGMkI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVOzBEQUFDO0lBTDNDLGVBQWU7UUFSM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLFNBQVMsRUFBRSxDQUFFLG1DQUFlLENBQUU7U0FDOUIsQ0FBQzt5Q0FZeUIsbUNBQWU7WUFDWix3Q0FBa0I7WUFDaEMsV0FBSTtZQUNGLGVBQU07T0FiWCxlQUFlLENBMEYzQjtJQUFELHNCQUFDO0NBQUEsQUExRkQsSUEwRkM7QUExRlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VjaG8nO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbic7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZVdlYkFwaSBmcm9tICduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlJztcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gJ3VpL2VudW1zJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnY3JlYXRlJyxcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6ICcuL2NyZWF0ZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2NyZWF0ZS5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogWyBFY2hvTGlzdFNlcnZpY2UgXVxufSlcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0bG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbjtcblx0ZWNobyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJlY2hvVGV4dEZpZWxkXCIpIGVjaG9UZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG5cdGltYWdlOiBJbWFnZTtcblx0aW1hZ2VTcmM6IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLFxuXHRcdHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlLFxuXHRcdHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxuXG5cdG5nT25Jbml0KCkgeyBcblx0XHRjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG5cdH1cblxuXHRhZGQoKSB7XG5cdFx0aWYgKHRoaXMuZWNoby50cmltKCkgPT09IFwiXCIpIHtcblx0XHQgIGFsZXJ0KFwiRW50cmV6IHVuIGVjaG9cIik7XG5cdFx0ICByZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG5cdFx0dGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmxvY2F0aW9uU3ViamVjdC5zdWJzY3JpYmUoXG5cdFx0XHQobG9jYXRpb246IExvY2F0aW9uKSA9PiB7XG5cdFx0XHQgIHRoaXMuY3VycmVudExvY2F0aW9uID0gbG9jYXRpb247XG5cdFx0XHR9XG5cdFx0ICApO1xuXHRcdHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG5cdFx0dGhpcy5nZW9sb2NhdGlvblNlcnZpY2UuZW1pdExvY2F0aW9uKCk7XG5cdFxuXHRcdHZhciBuZXdFY2hvID0gbmV3IEVjaG8oKTtcblx0XHRuZXdFY2hvLm5hbWUgPSB0aGlzLmVjaG87XG5cdFx0bmV3RWNoby5kYXRlID0gRGF0ZS5ub3coKTtcblx0XHRuZXdFY2hvLmxhdGl0dWRlID0gdGhpcy5jdXJyZW50TG9jYXRpb24ubGF0aXR1ZGU7XG5cdFx0bmV3RWNoby5sb25naXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sb25naXR1ZGU7XG5cblx0XHRpZiAodGhpcy5pbWFnZVNyYykgeyAvLyBpbWFnZSBhc3NvY2nDqSDDoCBsJ0VDSE9cblx0XHRcdHRoaXMuZWNob0xpc3RTZXJ2aWNlLnVwbG9hZEZpbGUodGhpcy5pbWFnZVNyYylcblx0XHRcdC50aGVuKCh1cmxQaWN0dXJlKSA9PiB7XG5cdFx0XHRcdG5ld0VjaG8uaW1nID0gdXJsUGljdHVyZTtcblx0XHRcdFx0dGhpcy5lY2hvTGlzdFNlcnZpY2UuZ2V0RWNob3MoKS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVjaG9MaXN0U2VydmljZS5jcmVhdGVOZXdFY2hvKG5ld0VjaG8pO1xuXHRcdFx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHsgLy8gRUNITyBzYW5zIGltYWdlXG5cdFx0XHR0aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFY2hvcygpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVjaG9MaXN0U2VydmljZS5jcmVhdGVOZXdFY2hvKG5ld0VjaG8pO1xuXHRcdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9saXN0J10pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblxuXHRvblRhcERlbGV0ZSgpIHtcblx0XHRkaWFsb2dzLmNvbmZpcm0oe1xuXHRcdFx0dGl0bGU6IFwiVm91cyBhbGxleiBwZXJkcmUgbCdpbWFnZVwiLFxuXHRcdFx0bWVzc2FnZTogXCJDb25maXJtZXIgP1wiLFxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk91aVwiLFxuXHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogXCJBbm51bGVyXCJcblx0XHR9KS50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHQvLyByZXN1bHQgYXJndW1lbnQgaXMgYm9vbGVhblxuXHRcdFx0Y29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG5cdFx0XHRpZiAocmVzdWx0KSB7IC8vIGplIG5lIHZldXggcGFzIHF1aXR0ZXJcblx0XHRcdFx0dGhpcy5pbWFnZSA9IG51bGw7XG5cdFx0XHRcdHRoaXMuaW1hZ2VTcmMgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0dGFrZVBpY3R1cmUoKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSB7XG5cdFx0XHR3aWR0aDogNTAwLFxuXHRcdFx0a2VlcEFzcGVjdFJhdGlvOiB0cnVlLFxuXHRcdFx0c2F2ZVRvR2FsbGVyeTogdHJ1ZVxuXHRcdH07XG4gICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpXG4gICAgLnRoZW4oKGltYWdlQXNzZXQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgaXMgYW4gaW1hZ2UgYXNzZXQgaW5zdGFuY2VcIik7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0dGhpcy5pbWFnZS5zcmMgPSBpbWFnZUFzc2V0O1xuXHRcdFx0XHR0aGlzLmltYWdlU3JjID0gdGhpcy5pbWFnZS5zcmMuX2FuZHJvaWQ7XG5cdFx0XHRcdC8vY29uc29sZS5sb2codGhpcy5pbWFnZVNyYyk7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0+IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG59Il19