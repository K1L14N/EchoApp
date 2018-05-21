"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var Subject_1 = require("rxjs/Subject");
var geolocation_service_1 = require("./geolocation.service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RDtBQUU5RCxpRUFBb0U7QUFDcEUsd0NBQXVDO0FBQ3ZDLDZEQUEyRDtBQUMzRCxzREFBd0Q7QUFDeEQscUVBQW9EO0FBSXBEO0lBU0UseUJBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBUDFELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBWSxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUNyQyx1QkFBa0IsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUUzQyxXQUFNLEdBQVcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO0lBRVcsQ0FBQztJQUU5RCxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHlDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsbUNBQVMsR0FBVDtRQUNFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUFBLGlCQThCQztRQTdCQyxjQUFjLENBQUMsUUFBUSxF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QztBQS9FWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSBcIi4uL21vZGVscy9lY2hvXCI7XG5pbXBvcnQgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcCcpO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFY2hvTGlzdFNlcnZpY2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGVjaG9zOiBFY2hvW10gPSBbXTtcbiAgZWNob3NQb3J0ZWUgOiBFY2hvW10gPSBbXTtcbiAgZWNob3NTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWNob1tdPigpO1xuICBlY2hvc1BvcnRlZVN1YmplY3QgPSBuZXcgU3ViamVjdDxFY2hvW10+KCk7XG5cbiAgcG9ydGVlOiBudW1iZXIgPSAxMDAwMDsgLy8gMTAga2lsb23DqHRyZXMgZGUgcG9ydMOpZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpO1xuICB9XG5cbiAgZW1pdEVjaG9zKCkge1xuICAgIHRoaXMuZWNob3NTdWJqZWN0Lm5leHQodGhpcy5lY2hvcyk7XG4gIH1cblxuICBlbWl0RWNob3NQb3J0ZWUoKSB7XG4gICAgdGhpcy5lY2hvc1BvcnRlZVN1YmplY3QubmV4dCh0aGlzLmVjaG9zUG9ydGVlKTtcbiAgfVxuICBzYXZlRWNob3MoKSB7XG4gICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKS5zZXQodGhpcy5lY2hvcyk7XG4gIH1cblxuICBnZXRFY2hvcygpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpXG4gICAgICAub24oJ3ZhbHVlJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5lY2hvc1BvcnRlZSA9IFtdO1xuICAgICAgICBpZiAoZGF0YS52YWwoKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdfX19fX19fX19fX19fX19fX19fX19fJyk7XG4gICAgICAgICAgZGF0YS52YWwoKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgLy8gbG9jYXRpb24gZGUgbCfDqWNobyBsb3JzcXUnaWwgYSDDqXTDqSDDqW1pc1xuICAgICAgICAgICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgbXNnTG9jYXRpb24ubGF0aXR1ZGUgPSBlbGVtZW50LmxhdGl0dWRlO1xuICAgICAgICAgICAgbXNnTG9jYXRpb24ubG9uZ2l0dWRlID0gZWxlbWVudC5sb25naXR1ZGU7XG4gICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgLy8gbG9jYXRpb24gYWN0dWVsbGUgZGUgbCd1dGlsaXNhdGV1clxuICAgICAgICAgICAgICBsZXQgdXNlckxvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgIHVzZXJMb2NhdGlvbi5sb25naXR1ZGUgPSByZXN1bHQubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAvLyBkaXN0YW5jZSAoQ2FzdGVsIC0gUGFsbyBBbHRvIDogOTQzMzEyMCBtw6h0cmVzKVxuICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc3RhbmNlIDogJyArIGVsZW1lbnQubmFtZSArICcgOiAnICsgZGlzdGFuY2UpO1xuICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnBvcnRlZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWNob3MgPSBkYXRhLnZhbCgpID8gZGF0YS52YWwoKSA6IFtdO1xuICAgICAgICB0aGlzLmVtaXRFY2hvcygpO1xuICAgICAgfSk7XG4gIH1cblxuICBjcmVhdGVOZXdFY2hvKG5ld0VjaG86IEVjaG8pIHtcbiAgICB0aGlzLmVjaG9zLnVuc2hpZnQobmV3RWNobyk7XG4gICAgdGhpcy5zYXZlRWNob3MoKTtcbiAgICB0aGlzLmVtaXRFY2hvcygpO1xuICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gIH1cblxuICBnZXRFY2hvKGlkRWNobykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkRWNobykub25jZSgndmFsdWUnKS50aGVuKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEudmFsKCkpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG4iXX0=