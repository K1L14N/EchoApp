"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
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
        /* echosSubject = new Subject<Echo[]>();
        echosPorteeSubject = new Subject<Echo[]>(); */
        this.portee = 10000; // 10 kilomètres de portée
    }
    EchoListService.prototype.ngOnInit = function () {
        this.geolocationService.updateLocation();
        firebaseWebApi.database().ref('/msg');
    };
    EchoListService.prototype.emitEchos = function () {
        //this.echosSubject.next(this.echos);
    };
    EchoListService.prototype.emitEchosPortee = function () {
        //this.echosPorteeSubject.next(this.echosPortee);
    };
    EchoListService.prototype.saveEchos = function () {
        firebaseWebApi.database().ref('/msg').set(this.echos);
    };
    EchoListService.prototype.getExpiredEcho = function () {
        return new Promise(function (resolve, reject) {
            var ids = [];
            var currentTime = Date.now();
            var timeout = 30000; //30 secondes
            if (firebaseWebApi.database().ref('/msg')) {
                firebaseWebApi.database().ref('/msg')
                    .on('value', function (data) {
                    if (data.val()) {
                        var compteur_1 = 0;
                        data.val().forEach(function (element) {
                            /* console.log("current time : " + currentTime);
                            console.log("echo time : " + element.date);
                            console.log("différence : " + (currentTime - element.date)); */
                            if (element != null) {
                                if ((currentTime - element.date > timeout)) {
                                    console.log('Echo removed : ' + JSON.stringify(element));
                                    ids.push(compteur_1);
                                }
                                compteur_1++;
                            }
                        });
                        resolve(ids);
                    }
                });
            }
        });
    };
    EchoListService.prototype.removeExpiredEcho = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getExpiredEcho().then(function (ids) {
                if (ids) {
                    var idsToRemove = JSON.stringify(ids);
                    var i = JSON.parse(idsToRemove);
                    i.forEach(function (id) {
                        firebaseWebApi.database().ref('/msg/' + id).remove()
                            .then(function () {
                            console.log('Remove succeeded');
                            resolve();
                        })
                            .catch(function (error) {
                            console.log('Remove failed : ' + error);
                            reject(error);
                        });
                    });
                }
            });
        });
    };
    EchoListService.prototype.getEchos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (firebaseWebApi.database().ref('/msg')) {
                _this.echosPortee = [];
                firebaseWebApi.database().ref('/msg')
                    .on('value', function (data) {
                    if (data.val() == null) {
                        _this.echos = [];
                        resolve(_this.echos);
                    }
                    else {
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
                                    // distance (Tel - Palo Alto : 943XXXX mètres)
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
                    if (data.val()) {
                        _this.echos = data.val();
                    }
                    else {
                        _this.echos = [];
                    }
                    //this.echos = data.val() ? data.val() : [];
                    _this.emitEchos();
                });
            }
        });
    };
    EchoListService.prototype.createNewEcho = function (newEcho) {
        this.echos.unshift(newEcho);
        this.saveEchos();
        /* this.emitEchos();
        this.emitEchosPortee(); */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRTtBQUV0RSxpRUFBb0U7QUFFcEUsNkRBQTJEO0FBQzNELHNEQUF3RDtBQUN4RCxxRUFBb0Q7QUFFcEQsdURBQTBEO0FBRTFELG1DQUFpQztBQUNqQywrQ0FBNkM7QUFFN0MsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO0FBR2hEO0lBVUUseUJBQ1ksa0JBQXNDLEVBQ3RDLFdBQXdCO1FBRHhCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWcEMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixnQkFBVyxHQUFTLEVBQUUsQ0FBQztRQUN2QjtzREFDOEM7UUFFOUMsV0FBTSxHQUFXLEtBQUssQ0FBQyxDQUFDLDBCQUEwQjtJQUtYLENBQUM7SUFFeEMsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxtQ0FBUyxHQUFUO1FBQ0UscUNBQXFDO0lBQ3ZDLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0UsaURBQWlEO0lBQ25ELENBQUM7SUFDRCxtQ0FBUyxHQUFUO1FBQ0UsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCx3Q0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUks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QiwwQkFBVztPQVp6QixlQUFlLENBa0wzQjtJQUFELHNCQUFDO0NBQUEsQUFsTEQsSUFrTEM7QUFsTFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSBcIi4uL21vZGVscy9lY2hvXCI7XG5pbXBvcnQgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcCcpO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vLi4vcGxhdGZvcm1zL2FuZHJvaWQvYXBwL3NyYy9tYWluL2Fzc2V0cy9hcHAvdG5zX21vZHVsZXMvcnhqcy9zcmMvdXRpbC9pZGVudGl0eSc7XG52YXIgZnMgPSByZXF1aXJlKFwiZmlsZS1zeXN0ZW1cIik7XG52YXIgYXBwUGF0aCA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVjaG9MaXN0U2VydmljZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZWNob3M6IEVjaG9bXSA9IFtdO1xuICBlY2hvc1BvcnRlZSA6IGFueSA9IFtdO1xuICAvKiBlY2hvc1N1YmplY3QgPSBuZXcgU3ViamVjdDxFY2hvW10+KCk7XG4gIGVjaG9zUG9ydGVlU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVjaG9bXT4oKTsgKi9cblxuICBwb3J0ZWU6IG51bWJlciA9IDEwMDAwOyAvLyAxMCBraWxvbcOodHJlcyBkZSBwb3J0w6llXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG4gICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJyk7XG4gIH1cblxuICBlbWl0RWNob3MoKSB7XG4gICAgLy90aGlzLmVjaG9zU3ViamVjdC5uZXh0KHRoaXMuZWNob3MpO1xuICB9XG5cbiAgZW1pdEVjaG9zUG9ydGVlKCkge1xuICAgIC8vdGhpcy5lY2hvc1BvcnRlZVN1YmplY3QubmV4dCh0aGlzLmVjaG9zUG9ydGVlKTtcbiAgfVxuICBzYXZlRWNob3MoKSB7XG4gICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKS5zZXQodGhpcy5lY2hvcyk7XG4gIH1cblxuICBnZXRFeHBpcmVkRWNobygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBpZHM6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAzMDAwMDsgLy8zMCBzZWNvbmRlc1xuICAgICAgICBpZiAoZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKSkge1xuICAgICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJylcbiAgICAgICAgICAgIC5vbigndmFsdWUnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGF0YS52YWwoKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wdGV1ciA9IDA7XG4gICAgICAgICAgICAgICAgZGF0YS52YWwoKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgLyogY29uc29sZS5sb2coXCJjdXJyZW50IHRpbWUgOiBcIiArIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWNobyB0aW1lIDogXCIgKyBlbGVtZW50LmRhdGUpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaWZmw6lyZW5jZSA6IFwiICsgKGN1cnJlbnRUaW1lIC0gZWxlbWVudC5kYXRlKSk7ICovXG4gICAgICAgICAgICAgICAgICBpZihlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoKGN1cnJlbnRUaW1lIC0gZWxlbWVudC5kYXRlID4gdGltZW91dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VjaG8gcmVtb3ZlZCA6ICcgKyBKU09OLnN0cmluZ2lmeShlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIGlkcy5wdXNoKGNvbXB0ZXVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21wdGV1cisrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpZHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgIH19XG4gICAgKTtcbiAgfVxuXG4gIHJlbW92ZUV4cGlyZWRFY2hvKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5nZXRFeHBpcmVkRWNobygpLnRoZW4oKGlkcykgPT4ge1xuICAgICAgICAgIGlmIChpZHMpIHtcbiAgICAgICAgICAgIGxldCBpZHNUb1JlbW92ZSA9IEpTT04uc3RyaW5naWZ5KGlkcyk7XG4gICAgICAgICAgICBsZXQgaSA9IEpTT04ucGFyc2UoaWRzVG9SZW1vdmUpO1xuICAgICAgICAgICAgaS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtjb25zb2xlLmxvZygnUmVtb3ZlIHN1Y2NlZWRlZCcpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7IGNvbnNvbGUubG9nKCdSZW1vdmUgZmFpbGVkIDogJyArIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApXG4gICAgXG4gIH1cblxuICBnZXRFY2hvcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gICAgICAgICAgdGhpcy5lY2hvc1BvcnRlZSA9IFtdO1xuICAgICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJylcbiAgICAgICAgICAgIC5vbigndmFsdWUnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKGRhdGEudmFsKCkgPT0gbnVsbCkgeyAvLyBwYXMgZGUgbXNnIGRhbnMgbGEgREJcbiAgICAgICAgICAgICAgICB0aGlzLmVjaG9zID0gW107XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmVjaG9zKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbXNnIGRhbnMgbGEgREJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnX19fX19fX19fX19fX19fX19fX19fXycpO1xuICAgICAgICAgICAgICAgIGRhdGEudmFsKCkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7IC8vIGRhdGFiYXNlIG5vbiB2aWRlXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uIGRlIGwnw6ljaG8gbG9yc3F1J2lsIGEgw6l0w6kgw6ltaXNcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBtc2dMb2NhdGlvbi5sYXRpdHVkZSA9IGVsZW1lbnQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgIG1zZ0xvY2F0aW9uLmxvbmdpdHVkZSA9IGVsZW1lbnQubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbiBhY3R1ZWxsZSBkZSBsJ3V0aWxpc2F0ZXVyXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJMb2NhdGlvbjogTG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlckxvY2F0aW9uLmxvbmdpdHVkZSA9IHJlc3VsdC5sb25naXR1ZGU7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gZGlzdGFuY2UgKFRlbCAtIFBhbG8gQWx0byA6IDk0M1hYWFggbcOodHJlcylcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzdGFuY2UgOiAnICsgZWxlbWVudC5uYW1lICsgJyA6ICcgKyBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5wb3J0ZWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmVjaG9zUG9ydGVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZGF0YS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWNob3MgPSBkYXRhLnZhbCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWNob3MgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvL3RoaXMuZWNob3MgPSBkYXRhLnZhbCgpID8gZGF0YS52YWwoKSA6IFtdO1xuICAgICAgICAgICAgICB0aGlzLmVtaXRFY2hvcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICBcbiAgfVxuXG4gIGNyZWF0ZU5ld0VjaG8obmV3RWNobzogRWNobykge1xuICAgIHRoaXMuZWNob3MudW5zaGlmdChuZXdFY2hvKTtcbiAgICB0aGlzLnNhdmVFY2hvcygpO1xuICAgIC8qIHRoaXMuZW1pdEVjaG9zKCk7XG4gICAgdGhpcy5lbWl0RWNob3NQb3J0ZWUoKTsgKi9cbiAgfVxuXG4gIGdldEVjaG8oaWRFY2hvKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZy8nICsgaWRFY2hvKS5vbmNlKCd2YWx1ZScpLnRoZW4oXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS52YWwoKSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgdXBsb2FkRmlsZShsb2NhbFBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VySWQoKSArIERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHJlbW90ZVBhdGggPSBgJHtmaWxlbmFtZX1gO1xuICAgICAgICByZXR1cm4gZmlyZWJhc2UudXBsb2FkRmlsZSh7XG4gICAgICAgICAgcmVtb3RlRnVsbFBhdGg6IHJlbW90ZVBhdGgsIC8vIHN1ciBxdWVsIG5vZXVkIGRlIGZpcmViYXNlIGplIGwnZW52b2lcbiAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBsb2NhbFBhdGgsIC8vIG91IGplIGNoZXJjaGUgbCdpbWFnZVxuICAgICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uKHN0YXR1cykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICh1cGxvYWRlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodXBsb2FkZWRGaWxlKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9XG4gICAgKSBcbiAgfVxuXG59XG5cbiJdfQ==