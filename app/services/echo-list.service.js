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
        this.nbMsg = 0;
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
    EchoListService.prototype.getNbEchos = function () {
        var _this = this;
        this.nbMsg = 0; // re init
        if (firebaseWebApi.database().ref('/msg')) {
            firebaseWebApi.database().ref('/msg').on('value', function (message) {
                if (message.val() == null) {
                    return _this.nbMsg;
                }
                else {
                    message.val().forEach(function (message) {
                        if (message) {
                            _this.nbMsg++;
                        }
                    });
                }
            });
        }
        else {
            return this.nbMsg;
        }
    };
    EchoListService.prototype.pushEchos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var count = 0;
            var echos = []; // re init
            if (firebaseWebApi.database().ref('/msg')) {
                firebaseWebApi.database().ref('/msg').on('value', function (message) {
                    if (message.val() == null) {
                        resolve(echos);
                    }
                    else {
                        message.val().forEach(function (message) {
                            if (message) {
                                //console.log('message present' + JSON.stringify(message));
                                echos.push(message);
                                count++;
                            }
                            if (count == _this.nbMsg) {
                                resolve(echos);
                            }
                        });
                    }
                });
            }
            else {
                resolve(echos);
            }
        });
    };
    EchoListService.prototype.setEchos = function (echos) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var allEchos = JSON.stringify(echos);
            var allEchosArray = JSON.parse(allEchos);
            _this.echos = allEchosArray;
            resolve();
        });
    };
    EchoListService.prototype.getEchos = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getNbEchos();
            _this.pushEchos().then(function (echos) {
                _this.setEchos(echos).then(function () {
                    resolve();
                });
            });
        });
    };
    EchoListService.prototype.getEchosRange = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getEchos().then(function () {
                _this.echosPortee = [];
                var echos = _this.echos;
                echos.forEach(function (echo) {
                    _this.echosPortee.push(_this.compareDistance(echo, _this.geolocationService.location));
                });
                resolve();
            });
        });
    };
    EchoListService.prototype.compareDistance = function (element, usrLocation) {
        var msgLocation = new nativescript_geolocation_1.Location();
        msgLocation.latitude = element.latitude;
        msgLocation.longitude = element.longitude;
        var userLocation = new nativescript_geolocation_1.Location();
        userLocation.latitude = usrLocation.latitude;
        userLocation.longitude = usrLocation.longitude;
        var distance = geoLocation.distance(msgLocation, userLocation);
        if (distance < this.portee) {
            return element;
        }
    };
    EchoListService.prototype.createNewEcho = function (newEcho) {
        this.echos.unshift(newEcho);
        this.echosPortee.unshift(newEcho);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRTtBQUV0RSxpRUFBb0U7QUFFcEUsNkRBQTJEO0FBQzNELHNEQUF3RDtBQUN4RCxxRUFBb0Q7QUFFcEQsdURBQTBEO0FBRTFELG1DQUFpQztBQUNqQywrQ0FBNkM7QUFFN0MsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO0FBR2hEO0lBV0UseUJBQ1ksa0JBQXNDLEVBQ3RDLFdBQXdCO1FBRHhCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFYcEMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBWSxFQUFFLENBQUM7UUFDMUI7c0RBQzhDO1FBRTlDLFdBQU0sR0FBVyxLQUFLLENBQUMsQ0FBQywwQkFBMEI7SUFLWCxDQUFDO0lBRXhDLGtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUNFLHFDQUFxQztJQUN2QyxDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNFLGlEQUFpRDtJQUNuRCxDQUFDO0lBQ0QsbUNBQVMsR0FBVDtRQUNFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsd0NBQWMs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QUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BFLElBQUksVUFBVSxHQUFHLEtBQUcsUUFBVSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUN6QixjQUFjLEVBQUUsVUFBVTtnQkFDMUIsYUFBYSxFQUFFLFNBQVM7Z0JBQ3hCLFVBQVUsRUFBRSxVQUFTLE1BQU07b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3RFLENBQUM7YUFDRixDQUFDLENBQUMsSUFBSSxDQUNMLFVBQUMsWUFBWTtnQkFDWCxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQkFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUNGLENBQUE7UUFDSCxDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUF2T1UsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQWFxQix3Q0FBa0I7WUFDekIsMEJBQVc7T0FiekIsZUFBZSxDQXlPM0I7SUFBRCxzQkFBQztDQUFBLEFBek9ELElBeU9DO0FBek9ZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWNobyB9IGZyb20gXCIuLi9tb2RlbHMvZWNob1wiO1xuaW1wb3J0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHAnKTtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9nZW9sb2NhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIGdlb0xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4uLy4uL3BsYXRmb3Jtcy9hbmRyb2lkL2FwcC9zcmMvbWFpbi9hc3NldHMvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL3V0aWwvaWRlbnRpdHknO1xudmFyIGZzID0gcmVxdWlyZShcImZpbGUtc3lzdGVtXCIpO1xudmFyIGFwcFBhdGggPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGg7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFY2hvTGlzdFNlcnZpY2UgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIG5iTXNnID0gMDtcbiAgZWNob3M6IEVjaG9bXSA9IFtdO1xuICBlY2hvc1BvcnRlZSA6IEVjaG9bXSA9IFtdO1xuICAvKiBlY2hvc1N1YmplY3QgPSBuZXcgU3ViamVjdDxFY2hvW10+KCk7XG4gIGVjaG9zUG9ydGVlU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVjaG9bXT4oKTsgKi9cblxuICBwb3J0ZWU6IG51bWJlciA9IDEwMDAwOyAvLyAxMCBraWxvbcOodHJlcyBkZSBwb3J0w6llXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZ2VvbG9jYXRpb25TZXJ2aWNlOiBHZW9sb2NhdGlvblNlcnZpY2UsXG4gICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJyk7XG4gIH1cblxuICBlbWl0RWNob3MoKSB7XG4gICAgLy90aGlzLmVjaG9zU3ViamVjdC5uZXh0KHRoaXMuZWNob3MpO1xuICB9XG5cbiAgZW1pdEVjaG9zUG9ydGVlKCkge1xuICAgIC8vdGhpcy5lY2hvc1BvcnRlZVN1YmplY3QubmV4dCh0aGlzLmVjaG9zUG9ydGVlKTtcbiAgfVxuICBzYXZlRWNob3MoKSB7XG4gICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKS5zZXQodGhpcy5lY2hvcyk7XG4gIH1cblxuICBnZXRFeHBpcmVkRWNobygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBpZHM6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAzMDAwMDsgLy8zMCBzZWNvbmRlc1xuICAgICAgICBpZiAoZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKSkge1xuICAgICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJylcbiAgICAgICAgICAgIC5vbigndmFsdWUnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGF0YS52YWwoKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wdGV1ciA9IDA7XG4gICAgICAgICAgICAgICAgZGF0YS52YWwoKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgLyogY29uc29sZS5sb2coXCJjdXJyZW50IHRpbWUgOiBcIiArIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWNobyB0aW1lIDogXCIgKyBlbGVtZW50LmRhdGUpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaWZmw6lyZW5jZSA6IFwiICsgKGN1cnJlbnRUaW1lIC0gZWxlbWVudC5kYXRlKSk7ICovXG4gICAgICAgICAgICAgICAgICBpZihlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoKGN1cnJlbnRUaW1lIC0gZWxlbWVudC5kYXRlID4gdGltZW91dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VjaG8gcmVtb3ZlZCA6ICcgKyBKU09OLnN0cmluZ2lmeShlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIGlkcy5wdXNoKGNvbXB0ZXVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21wdGV1cisrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpZHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgIH19XG4gICAgKTtcbiAgfVxuXG4gIHJlbW92ZUV4cGlyZWRFY2hvKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5nZXRFeHBpcmVkRWNobygpLnRoZW4oKGlkcykgPT4ge1xuICAgICAgICAgIGlmIChpZHMpIHtcbiAgICAgICAgICAgIGxldCBpZHNUb1JlbW92ZSA9IEpTT04uc3RyaW5naWZ5KGlkcyk7XG4gICAgICAgICAgICBsZXQgaSA9IEpTT04ucGFyc2UoaWRzVG9SZW1vdmUpO1xuICAgICAgICAgICAgaS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cvJyArIGlkKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtjb25zb2xlLmxvZygnUmVtb3ZlIHN1Y2NlZWRlZCcpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7IGNvbnNvbGUubG9nKCdSZW1vdmUgZmFpbGVkIDogJyArIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApXG4gICAgXG4gIH1cblxuICBnZXROYkVjaG9zKCkge1xuICAgIHRoaXMubmJNc2cgPSAwOyAvLyByZSBpbml0XG4gICAgaWYgKGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJykpIHtcbiAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJykub24oJ3ZhbHVlJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKG1lc3NhZ2UudmFsKCkgPT0gbnVsbCkgeyAvLyBEQiB2aWRlXG4gICAgICAgICAgcmV0dXJuIHRoaXMubmJNc2c7XG4gICAgICAgIH0gZWxzZSB7IC8vIERCIG5vbiB2aWRlXG4gICAgICAgICAgbWVzc2FnZS52YWwoKS5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5uYk1zZysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm5iTXNnO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hFY2hvcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHZhciBlY2hvcyA9IFtdIC8vIHJlIGluaXRcbiAgICAgICAgaWYgKGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJykpIHtcbiAgICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpLm9uKCd2YWx1ZScsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS52YWwoKSA9PSBudWxsKSB7IC8vIERCIHZpZGVcbiAgICAgICAgICAgICAgcmVzb2x2ZShlY2hvcyk7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBEQiBub24gdmlkZVxuICAgICAgICAgICAgICBtZXNzYWdlLnZhbCgpLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21lc3NhZ2UgcHJlc2VudCcgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgICBlY2hvcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IHRoaXMubmJNc2cpIHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoZWNob3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoZWNob3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgc2V0RWNob3MoZWNob3MpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBhbGxFY2hvcyA9IEpTT04uc3RyaW5naWZ5KGVjaG9zKTtcbiAgICAgICAgbGV0IGFsbEVjaG9zQXJyYXkgPSBKU09OLnBhcnNlKGFsbEVjaG9zKTtcbiAgICAgICAgdGhpcy5lY2hvcyA9IGFsbEVjaG9zQXJyYXk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBnZXRFY2hvcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0TmJFY2hvcygpO1xuICAgICAgICB0aGlzLnB1c2hFY2hvcygpLnRoZW4oKGVjaG9zKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRFY2hvcyhlY2hvcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBcbiAgXG4gIGdldEVjaG9zUmFuZ2UoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldEVjaG9zKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lY2hvc1BvcnRlZSA9IFtdO1xuICAgICAgICAgIGxldCBlY2hvcyA9IHRoaXMuZWNob3M7XG4gICAgICAgICAgZWNob3MuZm9yRWFjaChlY2hvID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaCh0aGlzLmNvbXBhcmVEaXN0YW5jZShlY2hvLCB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5sb2NhdGlvbikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH1cblxuICBjb21wYXJlRGlzdGFuY2UoZWxlbWVudCwgdXNyTG9jYXRpb24pIHtcbiAgICBsZXQgbXNnTG9jYXRpb246IExvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgbXNnTG9jYXRpb24ubGF0aXR1ZGUgPSBlbGVtZW50LmxhdGl0dWRlO1xuICAgIG1zZ0xvY2F0aW9uLmxvbmdpdHVkZSA9IGVsZW1lbnQubG9uZ2l0dWRlO1xuICAgIGxldCB1c2VyTG9jYXRpb246IExvY2F0aW9uID0gbmV3IExvY2F0aW9uKCk7XG4gICAgdXNlckxvY2F0aW9uLmxhdGl0dWRlID0gdXNyTG9jYXRpb24ubGF0aXR1ZGU7XG4gICAgdXNlckxvY2F0aW9uLmxvbmdpdHVkZSA9IHVzckxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnBvcnRlZSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTmV3RWNobyhuZXdFY2hvOiBFY2hvKSB7XG4gICAgdGhpcy5lY2hvcy51bnNoaWZ0KG5ld0VjaG8pO1xuICAgIHRoaXMuZWNob3NQb3J0ZWUudW5zaGlmdChuZXdFY2hvKTtcbiAgICBcbiAgICB0aGlzLnNhdmVFY2hvcygpO1xuICAgIHRoaXMuZW1pdEVjaG9zKCk7XG4gICAgdGhpcy5lbWl0RWNob3NQb3J0ZWUoKTtcbiAgICBcbiAgfVxuXG4gIGdldEVjaG8oaWRFY2hvKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZy8nICsgaWRFY2hvKS5vbmNlKCd2YWx1ZScpLnRoZW4oXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS52YWwoKSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgdXBsb2FkRmlsZShsb2NhbFBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VySWQoKSArIERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IHJlbW90ZVBhdGggPSBgJHtmaWxlbmFtZX1gO1xuICAgICAgICByZXR1cm4gZmlyZWJhc2UudXBsb2FkRmlsZSh7XG4gICAgICAgICAgcmVtb3RlRnVsbFBhdGg6IHJlbW90ZVBhdGgsIC8vIHN1ciBxdWVsIG5vZXVkIGRlIGZpcmViYXNlIGplIGwnZW52b2lcbiAgICAgICAgICBsb2NhbEZ1bGxQYXRoOiBsb2NhbFBhdGgsIC8vIG91IGplIGNoZXJjaGUgbCdpbWFnZVxuICAgICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uKHN0YXR1cykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICh1cGxvYWRlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodXBsb2FkZWRGaWxlKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9XG4gICAgKSBcbiAgfVxuXG59XG5cbiJdfQ==