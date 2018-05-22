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
    EchoListService.prototype.removeExpiratedEcho = function (id) {
        if (firebaseWebApi.database().ref('/msg/' + id)) {
            var msgRef = firebaseWebApi.database().ref('/msg/' + id);
            msgRef.remove()
                .then(function () {
                console.log('Remove succeeded');
            })
                .catch(function (error) {
                console.log('Remove failed : ' + error);
            });
        }
    };
    EchoListService.prototype.getEchos = function () {
        var _this = this;
        if (firebaseWebApi.database().ref('/msg')) {
            firebaseWebApi.database().ref('/msg')
                .on('value', function (data) {
                _this.echosPortee = [];
                if (data.val()) {
                    console.log('______________________');
                    data.val().forEach(function (element) {
                        if (element) {
                            // location de l'écho lorsqu'il a été émis
                            var msgLocation_1 = new nativescript_geolocation_1.Location();
                            msgLocation_1.latitude = element.latitude;
                            msgLocation_1.longitude = element.longitude;
                            _this.geolocationService.getDeviceLocation().then(function (result) {
                                // location actuelle de l'utilisateur
                                var userLocation = new nativescript_geolocation_1.Location();
                                userLocation.latitude = result.latitude;
                                userLocation.longitude = result.longitude;
                                // distance (Castel - Palo Alto : 9433120 mètres)
                                var distance = geoLocation.distance(msgLocation_1, userLocation);
                                console.log('distance : ' + element.name + ' : ' + distance);
                                if (distance < _this.portee) {
                                    _this.echosPortee.push(element);
                                }
                            }).then(function () {
                                _this.emitEchosPortee();
                            });
                        }
                    });
                }
                _this.echos = data.val() ? data.val() : [];
                _this.emitEchos();
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RDtBQUU5RCxpRUFBb0U7QUFDcEUsd0NBQXVDO0FBQ3ZDLDZEQUEyRDtBQUMzRCxzREFBd0Q7QUFDeEQscUVBQW9EO0FBSXBEO0lBU0UseUJBQW9CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBUDFELFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBWSxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUNyQyx1QkFBa0IsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUUzQyxXQUFNLEdBQVcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO0lBRVcsQ0FBQztJQUU5RCxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHlDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsbUNBQVMsR0FBVDtRQUNFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsNkNBQW1CLEdBQW5CLFVBQW9CLEVBQUU7UUFDcEIsRUFBRSxDQUFDLENBQUMs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QUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxNQUFNO1FBQ1osTUFBTSxDQUFDLElBQUksT0FBTyxDQUNoQixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2QsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDaEUsVUFBQyxJQUFJO2dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN0QixDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQTdGVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBVTZCLHdDQUFrQjtPQVQvQyxlQUFlLENBOEYzQjtJQUFELHNCQUFDO0NBQUEsQUE5RkQsSUE4RkM7QUE5RlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi9tb2RlbHMvZWNob1wiO1xuaW1wb3J0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHAnKTtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9nZW9sb2NhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGdlb0xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWNob0xpc3RTZXJ2aWNlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBlY2hvczogRWNob1tdID0gW107XG4gIGVjaG9zUG9ydGVlIDogRWNob1tdID0gW107XG4gIGVjaG9zU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVjaG9bXT4oKTtcbiAgZWNob3NQb3J0ZWVTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWNob1tdPigpO1xuXG4gIHBvcnRlZTogbnVtYmVyID0gMTAwMDA7IC8vIDEwIGtpbG9tw6h0cmVzIGRlIHBvcnTDqWVcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2VvbG9jYXRpb25TZXJ2aWNlLnVwZGF0ZUxvY2F0aW9uKCk7XG4gICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKTtcbiAgfVxuXG4gIGVtaXRFY2hvcygpIHtcbiAgICB0aGlzLmVjaG9zU3ViamVjdC5uZXh0KHRoaXMuZWNob3MpO1xuICB9XG5cbiAgZW1pdEVjaG9zUG9ydGVlKCkge1xuICAgIHRoaXMuZWNob3NQb3J0ZWVTdWJqZWN0Lm5leHQodGhpcy5lY2hvc1BvcnRlZSk7XG4gIH1cbiAgc2F2ZUVjaG9zKCkge1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJykuc2V0KHRoaXMuZWNob3MpO1xuICB9XG5cbiAgcmVtb3ZlRXhwaXJhdGVkRWNobyhpZCkge1xuICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZy8nICsgaWQpKSB7XG4gICAgICB2YXIgbXNnUmVmID0gZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkKTtcbiAgICBtc2dSZWYucmVtb3ZlKClcbiAgICAgIC50aGVuKCgpID0+IHsgY29uc29sZS5sb2coJ1JlbW92ZSBzdWNjZWVkZWQnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7IGNvbnNvbGUubG9nKCdSZW1vdmUgZmFpbGVkIDogJyArIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEVjaG9zKCkge1xuICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpXG4gICAgICAgIC5vbigndmFsdWUnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUgPSBbXTtcbiAgICAgICAgICBpZiAoZGF0YS52YWwoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ19fX19fX19fX19fX19fX19fX19fX18nKTtcbiAgICAgICAgICAgIGRhdGEudmFsKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHsgLy8gZGF0YWJhc2Ugbm9uIHZpZGVcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbiBkZSBsJ8OpY2hvIGxvcnNxdSdpbCBhIMOpdMOpIMOpbWlzXG4gICAgICAgICAgICAgICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgIG1zZ0xvY2F0aW9uLmxhdGl0dWRlID0gZWxlbWVudC5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICBtc2dMb2NhdGlvbi5sb25naXR1ZGUgPSBlbGVtZW50LmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uIGFjdHVlbGxlIGRlIGwndXRpbGlzYXRldXJcbiAgICAgICAgICAgICAgICAgIGxldCB1c2VyTG9jYXRpb246IExvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubG9uZ2l0dWRlID0gcmVzdWx0LmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgIC8vIGRpc3RhbmNlIChDYXN0ZWwgLSBQYWxvIEFsdG8gOiA5NDMzMTIwIG3DqHRyZXMpXG4gICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXN0YW5jZSA6ICcgKyBlbGVtZW50Lm5hbWUgKyAnIDogJyArIGRpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMucG9ydGVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZWNob3MgPSBkYXRhLnZhbCgpID8gZGF0YS52YWwoKSA6IFtdO1xuICAgICAgICAgIHRoaXMuZW1pdEVjaG9zKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICB9XG5cbiAgY3JlYXRlTmV3RWNobyhuZXdFY2hvOiBFY2hvKSB7XG4gICAgdGhpcy5lY2hvcy51bnNoaWZ0KG5ld0VjaG8pO1xuICAgIHRoaXMuc2F2ZUVjaG9zKCk7XG4gICAgdGhpcy5lbWl0RWNob3MoKTtcbiAgICB0aGlzLmVtaXRFY2hvc1BvcnRlZSgpO1xuICB9XG5cbiAgZ2V0RWNobyhpZEVjaG8pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnLycgKyBpZEVjaG8pLm9uY2UoJ3ZhbHVlJykudGhlbihcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnZhbCgpKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cblxuIl19