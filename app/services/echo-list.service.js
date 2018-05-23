"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var Subject_1 = require("rxjs/Subject");
var geolocation_service_1 = require("./geolocation.service");
var geoLocation = require("nativescript-geolocation");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var firebase = require("nativescript-plugin-firebase");
require("rxjs/add/operator/share");
var user_service_1 = require("./user.service");
var fs = require("file-system");
var appPath = fs.knownFolders.currentApp().path;
var EchoListService = /** @class */ (function () {
    function EchoListService(geolocationService, userService) {
        this.geolocationService = geolocationService;
        this.userService = userService;
        this.echos = [];
        this.echosPortee = [];
        this.echosSubject = new Subject_1.Subject();
        this.echosPorteeSubject = new Subject_1.Subject();
        this.portee = 10000; // 10 kilomètres de portée
    }
    EchoListService.prototype.ngOnInit = function () {
        this.geolocationService.updateLocation();
        //firebaseWebApi.database().ref('/msg');
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
        return new Promise(function (resolve, reject) {
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
                                    resolve(_this.echosPortee);
                                });
                            }
                        });
                    }
                    _this.echos = data.val() ? data.val() : [];
                    _this.emitEchos();
                });
            }
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
    EchoListService.prototype.uploadFile = function (localPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var filename = _this.userService.getUserId() + Date.now().toString();
            var remotePath = "" + filename;
            return firebase.uploadFile({
                remoteFullPath: remotePath,
                localFullPath: localPath,
                onProgress: function (status) {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                }
            }).then(function (uploadedFile) {
                resolve(uploadedFile);
            }, function (error) {
                reject(error);
            });
        });
    };
    EchoListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [geolocation_service_1.GeolocationService,
            user_service_1.UserService])
    ], EchoListService);
    return EchoListService;
}());
exports.EchoListService = EchoListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRTtBQUV0RSxpRUFBb0U7QUFDcEUsd0NBQXVDO0FBQ3ZDLDZEQUEyRDtBQUMzRCxzREFBd0Q7QUFDeEQscUVBQW9EO0FBRXBELHVEQUEwRDtBQUcxRCxtQ0FBaUM7QUFDakMsK0NBQTZDO0FBQzdDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztBQUdoRDtJQVVFLHlCQUNZLGtCQUFzQyxFQUN0QyxXQUF3QjtRQUR4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVnBDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBUyxFQUFFLENBQUM7UUFDdkIsaUJBQVksR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUNyQyx1QkFBa0IsR0FBRyxJQUFJLGlCQUFPLEVBQVUsQ0FBQztRQUUzQyxXQUFNLEdBQVcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO0lBS1gsQ0FBQztJQUV4QyxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLHdDQUF3QztJQUMxQyxDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxtQ0FBUyxHQUFUO1FBQ0Us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QUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEUsSUFBSSxVQUFVLEdBQUcsS0FBRyxRQUFVLENBQUM7WUFDL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pCLGNBQWMsRUFBRSxVQUFVO2dCQUMxQixhQUFhLEVBQUUsU0FBUztnQkFDeEIsVUFBVSxFQUFFLFVBQVMsTUFBTTtvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdEUsQ0FBQzthQUNGLENBQUMsQ0FBQyxJQUFJLENBQ0wsVUFBQyxZQUFZO2dCQUNYLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN4QixDQUFDLEVBQUUsVUFBQyxLQUFLO2dCQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQTtRQUNILENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQTVIVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBWXFCLHdDQUFrQjtZQUN6QiwwQkFBVztPQVp6QixlQUFlLENBOEgzQjtJQUFELHNCQUFDO0NBQUEsQUE5SEQsSUE4SEM7QUE5SFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSBcIi4uL21vZGVscy9lY2hvXCI7XG5pbXBvcnQgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcCcpO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9iYWNrZW5kLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLnNlcnZpY2UnO1xudmFyIGZzID0gcmVxdWlyZShcImZpbGUtc3lzdGVtXCIpO1xudmFyIGFwcFBhdGggPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGg7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFY2hvTGlzdFNlcnZpY2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGVjaG9zOiBFY2hvW10gPSBbXTtcbiAgZWNob3NQb3J0ZWUgOiBhbnkgPSBbXTtcbiAgZWNob3NTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWNob1tdPigpO1xuICBlY2hvc1BvcnRlZVN1YmplY3QgPSBuZXcgU3ViamVjdDxFY2hvW10+KCk7XG5cbiAgcG9ydGVlOiBudW1iZXIgPSAxMDAwMDsgLy8gMTAga2lsb23DqHRyZXMgZGUgcG9ydMOpZVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGdlb2xvY2F0aW9uU2VydmljZTogR2VvbG9jYXRpb25TZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UudXBkYXRlTG9jYXRpb24oKTtcbiAgICAvL2ZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJyk7XG4gIH1cblxuICBlbWl0RWNob3MoKSB7XG4gICAgdGhpcy5lY2hvc1N1YmplY3QubmV4dCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIGVtaXRFY2hvc1BvcnRlZSgpIHtcbiAgICB0aGlzLmVjaG9zUG9ydGVlU3ViamVjdC5uZXh0KHRoaXMuZWNob3NQb3J0ZWUpO1xuICB9XG4gIHNhdmVFY2hvcygpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpLnNldCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIHJlbW92ZUV4cGlyYXRlZEVjaG8oaWQpIHtcbiAgICBpZiAoZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkKSkge1xuICAgICAgdmFyIG1zZ1JlZiA9IGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnLycgKyBpZCk7XG4gICAgbXNnUmVmLnJlbW92ZSgpXG4gICAgICAudGhlbigoKSA9PiB7IGNvbnNvbGUubG9nKCdSZW1vdmUgc3VjY2VlZGVkJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4geyBjb25zb2xlLmxvZygnUmVtb3ZlIGZhaWxlZCA6ICcgKyBlcnJvcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRFY2hvcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKVxuICAgICAgICAgICAgLm9uKCd2YWx1ZScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUgPSBbXTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEudmFsKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnX19fX19fX19fX19fX19fX19fX19fXycpO1xuICAgICAgICAgICAgICAgIGRhdGEudmFsKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7IC8vIGRhdGFiYXNlIG5vbiB2aWRlXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uIGRlIGwnw6ljaG8gbG9yc3F1J2lsIGEgw6l0w6kgw6ltaXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBtc2dMb2NhdGlvbi5sYXRpdHVkZSA9IGVsZW1lbnQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgIG1zZ0xvY2F0aW9uLmxvbmdpdHVkZSA9IGVsZW1lbnQubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbiBhY3R1ZWxsZSBkZSBsJ3V0aWxpc2F0ZXVyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJMb2NhdGlvbjogTG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlckxvY2F0aW9uLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZGlzdGFuY2UgKENhc3RlbCAtIFBhbG8gQWx0byA6IDk0MzMxMjAgbcOodHJlcylcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzdGFuY2UgOiAnICsgZWxlbWVudC5uYW1lICsgJyA6ICcgKyBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5wb3J0ZWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmVjaG9zUG9ydGVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmVjaG9zID0gZGF0YS52YWwoKSA/IGRhdGEudmFsKCkgOiBbXTtcbiAgICAgICAgICAgICAgdGhpcy5lbWl0RWNob3MoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgXG4gIH1cblxuICBjcmVhdGVOZXdFY2hvKG5ld0VjaG86IEVjaG8pIHtcbiAgICB0aGlzLmVjaG9zLnVuc2hpZnQobmV3RWNobyk7XG4gICAgdGhpcy5zYXZlRWNob3MoKTtcbiAgICB0aGlzLmVtaXRFY2hvcygpO1xuICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gIH1cblxuICBnZXRFY2hvKGlkRWNobykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkRWNobykub25jZSgndmFsdWUnKS50aGVuKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEudmFsKCkpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHVwbG9hZEZpbGUobG9jYWxQYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcklkKCkgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCByZW1vdGVQYXRoID0gYCR7ZmlsZW5hbWV9YDtcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHJlbW90ZUZ1bGxQYXRoOiByZW1vdGVQYXRoLCAvLyBzdXIgcXVlbCBub2V1ZCBkZSBmaXJlYmFzZSBqZSBsJ2Vudm9pXG4gICAgICAgICAgbG9jYWxGdWxsUGF0aDogbG9jYWxQYXRoLCAvLyBvdSBqZSBjaGVyY2hlIGwnaW1hZ2VcbiAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihzdGF0dXMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWRlZCBmcmFjdGlvbjogXCIgKyBzdGF0dXMuZnJhY3Rpb25Db21wbGV0ZWQpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAodXBsb2FkZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHVwbG9hZGVkRmlsZSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgfVxuICAgICkgXG4gIH1cblxufVxuXG4iXX0=