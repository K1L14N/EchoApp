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
        this.model = "This is a texte";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0VBQW1FO0FBQ25FLDBDQUF5QztBQUV6QywwRUFBd0U7QUFDeEUsZ0NBQStCO0FBQy9CLDBDQUF5QztBQUl6Qyw0Q0FBOEM7QUFDOUMsa0NBQWlDO0FBQ2pDLG9DQUFzQztBQVd0QztJQVVDLHlCQUNTLGVBQWdDLEVBQ2hDLGtCQUFzQyxFQUN0QyxJQUFVLEVBQ1YsTUFBYztRQUhkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVnZCLFNBQUksR0FBRyxFQUFFLENBQUM7SUFZUixDQUFDO0lBRUgsa0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxLQUFLLEdBQUksaUJBQWlCLENBQUM7UUFDaEMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFHLEdBQUg7UUFBQSxpQkFtQ0M7UUFsQ0EsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUM1RSxVQUFDLFFBQWtCO1lBQ2pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLENBQUMsQ0FDQyxDQUFDO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixD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LE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXhGMkI7UUFBM0IsZ0JBQVMsQ0FBQyxlQUFlLENBQUM7a0NBQWdCLGlCQUFVOzBEQUFDO0lBTDNDLGVBQWU7UUFSM0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLFNBQVMsRUFBRSxDQUFFLG1DQUFlLENBQUU7U0FDOUIsQ0FBQzt5Q0FheUIsbUNBQWU7WUFDWix3Q0FBa0I7WUFDaEMsV0FBSTtZQUNGLGVBQU07T0FkWCxlQUFlLENBOEYzQjtJQUFELHNCQUFDO0NBQUEsQUE5RkQsSUE4RkM7QUE5RlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9lY2hvLWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VjaG8nO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkL3RleHQtZmllbGQnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlciB9wqBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvbic7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZVdlYkFwaSBmcm9tICduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlJztcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tIFwidWkvaW1hZ2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gJ3VpL2VudW1zJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnY3JlYXRlJyxcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6ICcuL2NyZWF0ZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2NyZWF0ZS5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogWyBFY2hvTGlzdFNlcnZpY2UgXVxufSlcblxuZXhwb3J0IGNsYXNzIENyZWF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0bG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgY3VycmVudExvY2F0aW9uOiBMb2NhdGlvbjtcblx0ZWNobyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJlY2hvVGV4dEZpZWxkXCIpIGVjaG9UZXh0RmllbGQ6IEVsZW1lbnRSZWY7XG5cdGltYWdlOiBJbWFnZTtcblx0aW1hZ2VTcmM6IHN0cmluZztcbm1vZGVsOmFueTtcblx0XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgZWNob0xpc3RTZXJ2aWNlOiBFY2hvTGlzdFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2UsXG5cdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuXHRcdFx0XG5cdFx0IH1cblxuXHRuZ09uSW5pdCgpIHsgXG5cdFx0dGhpcy5tb2RlbCAgPSBcIlRoaXMgaXMgYSB0ZXh0ZVwiO1xuXHRcdGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcblx0fVxuXG5cdGFkZCgpIHtcblx0XHRpZiAodGhpcy5lY2hvLnRyaW0oKSA9PT0gXCJcIikge1xuXHRcdCAgYWxlcnQoXCJFbnRyZXogdW4gZWNob1wiKTtcblx0XHQgIHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcblx0XHR0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9jYXRpb25TdWJqZWN0LnN1YnNjcmliZShcblx0XHRcdChsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcblx0XHRcdCAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBsb2NhdGlvbjtcblx0XHRcdH1cblx0XHQgICk7XG5cdFx0dGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcblx0XHR0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5lbWl0TG9jYXRpb24oKTtcblx0XG5cdFx0dmFyIG5ld0VjaG8gPSBuZXcgRWNobygpO1xuXHRcdG5ld0VjaG8ubmFtZSA9IHRoaXMuZWNobztcblx0XHRuZXdFY2hvLmRhdGUgPSBEYXRlLm5vdygpO1xuXHRcdG5ld0VjaG8ubGF0aXR1ZGUgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5sYXRpdHVkZTtcblx0XHRuZXdFY2hvLmxvbmdpdHVkZSA9IHRoaXMuY3VycmVudExvY2F0aW9uLmxvbmdpdHVkZTtcblxuXHRcdGlmICh0aGlzLmltYWdlU3JjKSB7IC8vIGltYWdlIGFzc29jacOpIMOgIGwnRUNIT1xuXHRcdFx0dGhpcy5lY2hvTGlzdFNlcnZpY2UudXBsb2FkRmlsZSh0aGlzLmltYWdlU3JjKVxuXHRcdFx0LnRoZW4oKHVybFBpY3R1cmUpID0+IHtcblx0XHRcdFx0bmV3RWNoby5pbWcgPSB1cmxQaWN0dXJlO1xuXHRcdFx0XHR0aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFY2hvcygpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZWNob0xpc3RTZXJ2aWNlLmNyZWF0ZU5ld0VjaG8obmV3RWNobyk7XG5cdFx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGlzdCddKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgeyAvLyBFQ0hPIHNhbnMgaW1hZ2Vcblx0XHRcdHRoaXMuZWNob0xpc3RTZXJ2aWNlLmdldEVjaG9zKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZWNob0xpc3RTZXJ2aWNlLmNyZWF0ZU5ld0VjaG8obmV3RWNobyk7XG5cdFx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xpc3QnXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXG5cdG9uVGFwRGVsZXRlKCkge1xuXHRcdGRpYWxvZ3MuY29uZmlybSh7XG5cdFx0XHR0aXRsZTogXCJWb3VzIGFsbGV6IHBlcmRyZSBsJ2ltYWdlXCIsXG5cdFx0XHRtZXNzYWdlOiBcIkNvbmZpcm1lciA/XCIsXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiT3VpXCIsXG5cdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBcIkFubnVsZXJcIlxuXHRcdH0pLnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXG5cdFx0XHRjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQ6IFwiICsgcmVzdWx0KTtcblx0XHRcdGlmIChyZXN1bHQpIHsgLy8gamUgbmUgdmV1eCBwYXMgcXVpdHRlclxuXHRcdFx0XHR0aGlzLmltYWdlID0gbnVsbDtcblx0XHRcdFx0dGhpcy5pbWFnZVNyYyA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR0YWtlUGljdHVyZSgpIHtcblx0XHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdHdpZHRoOiA1MDAsXG5cdFx0XHRrZWVwQXNwZWN0UmF0aW86IHRydWUsXG5cdFx0XHRzYXZlVG9HYWxsZXJ5OiB0cnVlXG5cdFx0fTtcbiAgICBjYW1lcmEudGFrZVBpY3R1cmUob3B0aW9ucylcbiAgICAudGhlbigoaW1hZ2VBc3NldCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCBpcyBhbiBpbWFnZSBhc3NldCBpbnN0YW5jZVwiKTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHR0aGlzLmltYWdlLnNyYyA9IGltYWdlQXNzZXQ7XG5cdFx0XHRcdHRoaXMuaW1hZ2VTcmMgPSB0aGlzLmltYWdlLnNyYy5fYW5kcm9pZDtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmltYWdlU3JjKTtcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnIubWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cbn0iXX0=