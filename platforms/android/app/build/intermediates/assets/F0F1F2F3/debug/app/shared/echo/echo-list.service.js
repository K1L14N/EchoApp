"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var Subject_1 = require("rxjs/Subject");
var geolocation_service_1 = require("../../services/geolocation.service");
var geoLocation = require("nativescript-geolocation");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var EchoListService = /** @class */ (function () {
    function EchoListService(geolocationService) {
        this.geolocationService = geolocationService;
        this.echos = [];
        this.echosPortee = [];
        this.echosSubject = new Subject_1.Subject();
        this.echosPorteeSubject = new Subject_1.Subject();
        this.portee = 10000; // 10 kilomètres de portée
    }
    EchoListService.prototype.ngOnInit = function () {
        this.geolocationService.updateLocation();
        firebaseWebApi.database().ref('/msg');
    };
    EchoListService.prototype.emitEchos = function () {
        this.echosSubject.next(this.echos);
    };
    EchoListService.prototype.emitEchosPortee = function () {
        this.echosPorteeSubject.next(this.echosPortee);
    };
    EchoListService.prototype.saveEchos = function () {
        firebaseWebApi.database().ref('/msg').set(this.echos);
    };
    EchoListService.prototype.getEchos = function () {
        var _this = this;
        firebaseWebApi.database().ref('/msg')
            .on('value', function (data) {
            _this.echosPortee = [];
            if (data.val()) {
                console.log('______________________');
                data.val().forEach(function (element) {
                    // location de l'écho lorsqu'il a été émis
                    var msgLocation = new nativescript_geolocation_1.Location();
                    msgLocation.latitude = element.latitude;
                    msgLocation.longitude = element.longitude;
                    _this.geolocationService.getDeviceLocation().then(function (result) {
                        // location actuelle de l'utilisateur
                        var userLocation = new nativescript_geolocation_1.Location();
                        userLocation.latitude = result.latitude;
                        userLocation.longitude = result.longitude;
                        // distance (Castel - Palo Alto : 9433120 mètres)
                        var distance = geoLocation.distance(msgLocation, userLocation);
                        console.log('distance : ' + element.name + ' : ' + distance);
                        if (distance < _this.portee) {
                            _this.echosPortee.push(element);
                        }
                    }).then(function () {
                        _this.emitEchosPortee();
                    });
                });
            }
            _this.echos = data.val() ? data.val() : [];
            _this.emitEchos();
        });
    };
    EchoListService.prototype.createNewEcho = function (newEcho) {
        this.echos.unshift(newEcho);
        this.saveEchos();
        this.emitEchos();
        this.emitEchosPortee();
    };
    EchoListService.prototype.getEcho = function (idEcho) {
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/msg/' + idEcho).once('value').then(function (data) {
                resolve(data.val());
            }, function (error) {
                reject(error);
            });
        });
    };
    EchoListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [geolocation_service_1.GeolocationService])
    ], EchoListService);
    return EchoListService;
}());
exports.EchoListService = EchoListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RDtBQUU5RCxpRUFBb0U7QUFDcEUsd0NBQXVDO0FBQ3ZDLDBFQUF3RTtBQUN4RSxzREFBd0Q7QUFDeEQscUVBQW9EO0FBSXBEO0lBU0UseUJBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBUDFELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBWSxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUNyQyx1QkFBa0IsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUUzQyxXQUFNLEdBQVcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO0lBRVcsQ0FBQztJQUU5RCxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHlDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsbUNBQVMsR0FBVDtRQUNFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUFBLGlCQThCQztRQTdCQyxjQUFjLENBQUMsUUFBUSxF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QztBQS9FWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSBcIi4vZWNob1wiO1xuaW1wb3J0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHAnKTtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ2VvbG9jYXRpb24uc2VydmljZSc7XG5pbXBvcnQgKiBhcyBnZW9Mb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVjaG9MaXN0U2VydmljZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZWNob3M6IEVjaG9bXSA9IFtdO1xuICBlY2hvc1BvcnRlZSA6IEVjaG9bXSA9IFtdO1xuICBlY2hvc1N1YmplY3QgPSBuZXcgU3ViamVjdDxFY2hvW10+KCk7XG4gIGVjaG9zUG9ydGVlU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVjaG9bXT4oKTtcblxuICBwb3J0ZWU6IG51bWJlciA9IDEwMDAwOyAvLyAxMCBraWxvbcOodHJlcyBkZSBwb3J0w6llXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJyk7XG4gIH1cblxuICBlbWl0RWNob3MoKSB7XG4gICAgdGhpcy5lY2hvc1N1YmplY3QubmV4dCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIGVtaXRFY2hvc1BvcnRlZSgpIHtcbiAgICB0aGlzLmVjaG9zUG9ydGVlU3ViamVjdC5uZXh0KHRoaXMuZWNob3NQb3J0ZWUpO1xuICB9XG4gIHNhdmVFY2hvcygpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpLnNldCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIGdldEVjaG9zKCkge1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJylcbiAgICAgIC5vbigndmFsdWUnLCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmVjaG9zUG9ydGVlID0gW107XG4gICAgICAgIGlmIChkYXRhLnZhbCgpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ19fX19fX19fX19fX19fX19fX19fX18nKTtcbiAgICAgICAgICBkYXRhLnZhbCgpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAvLyBsb2NhdGlvbiBkZSBsJ8OpY2hvIGxvcnNxdSdpbCBhIMOpdMOpIMOpbWlzXG4gICAgICAgICAgICBsZXQgbXNnTG9jYXRpb246IExvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgICAgICAgICBtc2dMb2NhdGlvbi5sYXRpdHVkZSA9IGVsZW1lbnQubGF0aXR1ZGU7XG4gICAgICAgICAgICBtc2dMb2NhdGlvbi5sb25naXR1ZGUgPSBlbGVtZW50LmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLmdldERldmljZUxvY2F0aW9uKCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAvLyBsb2NhdGlvbiBhY3R1ZWxsZSBkZSBsJ3V0aWxpc2F0ZXVyXG4gICAgICAgICAgICAgIGxldCB1c2VyTG9jYXRpb246IExvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgIHVzZXJMb2NhdGlvbi5sYXRpdHVkZSA9IHJlc3VsdC5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgdXNlckxvY2F0aW9uLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XG4gICAgICAgICAgICAgIC8vIGRpc3RhbmNlIChDYXN0ZWwgLSBQYWxvIEFsdG8gOiA5NDMzMTIwIG3DqHRyZXMpXG4gICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGdlb0xvY2F0aW9uLmRpc3RhbmNlKG1zZ0xvY2F0aW9uLCB1c2VyTG9jYXRpb24pO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzdGFuY2UgOiAnICsgZWxlbWVudC5uYW1lICsgJyA6ICcgKyBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMucG9ydGVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lY2hvc1BvcnRlZS5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5lbWl0RWNob3NQb3J0ZWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lY2hvcyA9IGRhdGEudmFsKCkgPyBkYXRhLnZhbCgpIDogW107XG4gICAgICAgIHRoaXMuZW1pdEVjaG9zKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZU5ld0VjaG8obmV3RWNobzogRWNobykge1xuICAgIHRoaXMuZWNob3MudW5zaGlmdChuZXdFY2hvKTtcbiAgICB0aGlzLnNhdmVFY2hvcygpO1xuICAgIHRoaXMuZW1pdEVjaG9zKCk7XG4gICAgdGhpcy5lbWl0RWNob3NQb3J0ZWUoKTtcbiAgfVxuXG4gIGdldEVjaG8oaWRFY2hvKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZy8nICsgaWRFY2hvKS5vbmNlKCd2YWx1ZScpLnRoZW4oXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS52YWwoKSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG5cbiJdfQ==