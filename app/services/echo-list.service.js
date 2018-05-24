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
        this.nbMsg = 0;
        this.echos = [];
        this.echosPortee = [];
        this.echosSubject = new Subject_1.Subject();
        this.echosPorteeSubject = new Subject_1.Subject();
        this.portee = 10000; // 10 kilomètres de portée
    }
    EchoListService.prototype.ngOnInit = function () {
        console.log("qqqq");
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
    //
    // getNbEchos() {
    //   this.nbMsg = 0; // re init
    //   if (firebaseWebApi.database().ref('/msg')) {
    //     firebaseWebApi.database().ref('/msg').on('value', (message) => {
    //       if (message.val() == null) { // DB vide
    //         return this.nbMsg;
    //       } else { // DB non vide
    //         message.val().forEach(message => {
    //           if (message) {
    //             this.nbMsg++;
    //           }
    //         })
    //       }
    //     })
    //   } else {
    //     return this.nbMsg;
    //   }
    // }
    // pushEchos() {
    //   return new Promise(
    //     (resolve, reject) => {
    //       let count = 0;
    //       var echos = [] // re init
    //       if (firebaseWebApi.database().ref('/msg')) {
    //         firebaseWebApi.database().ref('/msg').on('value', (message) => {
    //           if (message.val() == null) { // DB vide
    //             resolve(echos);
    //           } else { // DB non vide
    //             message.val().forEach(message => {
    //               if (message) {
    //                 //console.log('message present' + JSON.stringify(message));
    //                 echos.push(message);
    //                 count++;
    //               }
    //               if (count == this.nbMsg) {
    //                 resolve(echos);
    //               }
    //             })
    //           }
    //         })
    //       } else {
    //         resolve(echos);
    //       }
    //     }
    //   )
    // }
    // setEchos(echos) {
    //   return new Promise(
    //     (resolve, reject) => {
    //       let allEchos = JSON.stringify(echos);
    //       let allEchosArray = JSON.parse(allEchos);
    //       this.echos = allEchosArray;
    //       resolve();
    //     }
    //   )
    // }
    //
    // getEchos() {
    //   return new Promise(
    //     (resolve, reject) => {
    //       this.getNbEchos();
    //       this.pushEchos().then((echos) => {
    //         this.setEchos(echos).then(() => {
    //           resolve();
    //         })
    //       })
    //     }
    //   )
    // }
    // getEchosRange() {
    //   return new Promise(
    //     (resolve, reject) => {
    //       this.getEchos().then(() => {
    //         this.echosPortee = [];
    //         let echos = this.echos;
    //         echos.forEach(echo => {
    //           this.echosPortee.push(this.compareDistance(echo, this.geolocationService.location));
    //         });
    //         resolve();
    //       })
    //     })
    // }
    // compareDistance(element, usrLocation) {
    //   let msgLocation: Location = new Location();
    //   msgLocation.latitude = element.latitude;
    //   msgLocation.longitude = element.longitude;
    //   let userLocation: Location = new Location();
    //   userLocation.latitude = usrLocation.latitude;
    //   userLocation.longitude = usrLocation.longitude;
    //   let distance = geoLocation.distance(msgLocation, userLocation);
    //   if (distance < this.portee) {
    //     return element;
    //   }
    // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoby1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlY2hvLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzRTtBQUV0RSxpRUFBb0U7QUFDcEUsd0NBQXVDO0FBQ3ZDLDZEQUEyRDtBQUMzRCxzREFBd0Q7QUFDeEQscUVBQW9EO0FBRXBELHVEQUEwRDtBQUUxRCxtQ0FBaUM7QUFDakMsK0NBQTZDO0FBRTdDLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztBQUdoRDtJQVdFLHlCQUNZLGtCQUFzQyxFQUN0QyxXQUF3QjtRQUR4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBWHBDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLGdCQUFXLEdBQVksRUFBRSxDQUFDO1FBQzFCLGlCQUFZLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7UUFDckMsdUJBQWtCLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7UUFFM0MsV0FBTSxHQUFXLEtBQUssQ0FBQyxDQUFDLDBCQUEwQjtJQUtYLENBQUM7SUFFeEMsa0NBQVEsR0FBUjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJ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QUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQTtRQUNILENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztJQXhRVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBYXFCLHdDQUFrQjtZQUN6QiwwQkFBVztPQWJ6QixlQUFlLENBMFEzQjtJQUFELHNCQUFDO0NBQUEsQUExUUQsSUEwUUM7QUExUVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSBcIi4uL21vZGVscy9lY2hvXCI7XG5pbXBvcnQgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcCcpO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBHZW9sb2NhdGlvblNlcnZpY2UgfSBmcm9tICcuL2dlb2xvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZ2VvTG9jYXRpb24gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vLi4vcGxhdGZvcm1zL2FuZHJvaWQvYXBwL3NyYy9tYWluL2Fzc2V0cy9hcHAvdG5zX21vZHVsZXMvcnhqcy9zcmMvdXRpbC9pZGVudGl0eSc7XG52YXIgZnMgPSByZXF1aXJlKFwiZmlsZS1zeXN0ZW1cIik7XG52YXIgYXBwUGF0aCA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVjaG9MaXN0U2VydmljZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbmJNc2cgPSAwO1xuICBlY2hvczogRWNob1tdID0gW107XG4gIGVjaG9zUG9ydGVlIDogRWNob1tdID0gW107XG4gIGVjaG9zU3ViamVjdCA9IG5ldyBTdWJqZWN0PEVjaG9bXT4oKTtcbiAgZWNob3NQb3J0ZWVTdWJqZWN0ID0gbmV3IFN1YmplY3Q8RWNob1tdPigpO1xuXG4gIHBvcnRlZTogbnVtYmVyID0gMTAwMDA7IC8vIDEwIGtpbG9tw6h0cmVzIGRlIHBvcnTDqWVcblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBnZW9sb2NhdGlvblNlcnZpY2U6IEdlb2xvY2F0aW9uU2VydmljZSxcbiAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwicXFxcVwiKTtcbiAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS51cGRhdGVMb2NhdGlvbigpO1xuICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnJyk7XG4gIH1cblxuICBlbWl0RWNob3MoKSB7XG4gICAgdGhpcy5lY2hvc1N1YmplY3QubmV4dCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIGVtaXRFY2hvc1BvcnRlZSgpIHtcbiAgICB0aGlzLmVjaG9zUG9ydGVlU3ViamVjdC5uZXh0KHRoaXMuZWNob3NQb3J0ZWUpO1xuICB9XG4gIHNhdmVFY2hvcygpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpLnNldCh0aGlzLmVjaG9zKTtcbiAgfVxuXG4gIGdldEV4cGlyZWRFY2hvKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IGlkczogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgdGltZW91dCA9IDMwMDAwOyAvLzMwIHNlY29uZGVzXG4gICAgICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKVxuICAgICAgICAgICAgLm9uKCd2YWx1ZScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXB0ZXVyID0gMDtcbiAgICAgICAgICAgICAgICBkYXRhLnZhbCgpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAvKiBjb25zb2xlLmxvZyhcImN1cnJlbnQgdGltZSA6IFwiICsgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlY2hvIHRpbWUgOiBcIiArIGVsZW1lbnQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpZmbDqXJlbmNlIDogXCIgKyAoY3VycmVudFRpbWUgLSBlbGVtZW50LmRhdGUpKTsgKi9cbiAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZigoY3VycmVudFRpbWUgLSBlbGVtZW50LmRhdGUgPiB0aW1lb3V0KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRWNobyByZW1vdmVkIDogJyArIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2goY29tcHRldXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbXB0ZXVyKys7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlkcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfX1cbiAgICApO1xuICB9XG5cbiAgcmVtb3ZlRXhwaXJlZEVjaG8oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldEV4cGlyZWRFY2hvKCkudGhlbigoaWRzKSA9PiB7XG4gICAgICAgICAgaWYgKGlkcykge1xuICAgICAgICAgICAgbGV0IGlkc1RvUmVtb3ZlID0gSlNPTi5zdHJpbmdpZnkoaWRzKTtcbiAgICAgICAgICAgIGxldCBpID0gSlNPTi5wYXJzZShpZHNUb1JlbW92ZSk7XG4gICAgICAgICAgICBpLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZy8nICsgaWQpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge2NvbnNvbGUubG9nKCdSZW1vdmUgc3VjY2VlZGVkJyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHsgY29uc29sZS5sb2coJ1JlbW92ZSBmYWlsZWQgOiAnICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIClcblxuICB9XG4gIFxuICBnZXRFY2hvcygpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpXG4gICAgICAub24oJ3ZhbHVlJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5lY2hvc1BvcnRlZSA9IFtdO1xuICAgICAgICBpZiAoZGF0YS52YWwoKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdfX19fX19fX19fX19fX19fX19fX19fJyk7XG4gICAgICAgICAgZGF0YS52YWwoKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgLy8gbG9jYXRpb24gZGUgbCfDqWNobyBsb3JzcXUnaWwgYSDDqXTDqSDDqW1pc1xuICAgICAgICAgICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgbXNnTG9jYXRpb24ubGF0aXR1ZGUgPSBlbGVtZW50LmxhdGl0dWRlO1xuICAgICAgICAgICAgbXNnTG9jYXRpb24ubG9uZ2l0dWRlID0gZWxlbWVudC5sb25naXR1ZGU7XG4gICAgICAgICAgICB0aGlzLmdlb2xvY2F0aW9uU2VydmljZS5nZXREZXZpY2VMb2NhdGlvbigpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgLy8gbG9jYXRpb24gYWN0dWVsbGUgZGUgbCd1dGlsaXNhdGV1clxuICAgICAgICAgICAgICBsZXQgdXNlckxvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgICB1c2VyTG9jYXRpb24ubGF0aXR1ZGUgPSByZXN1bHQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgIHVzZXJMb2NhdGlvbi5sb25naXR1ZGUgPSByZXN1bHQubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAvLyBkaXN0YW5jZSAoQ2FzdGVsIC0gUGFsbyBBbHRvIDogOTQzMzEyMCBtw6h0cmVzKVxuICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBnZW9Mb2NhdGlvbi5kaXN0YW5jZShtc2dMb2NhdGlvbiwgdXNlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc3RhbmNlIDogJyArIGVsZW1lbnQubmFtZSArICcgOiAnICsgZGlzdGFuY2UpO1xuICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnBvcnRlZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZW1pdEVjaG9zUG9ydGVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWNob3MgPSBkYXRhLnZhbCgpID8gZGF0YS52YWwoKSA6IFtdO1xuICAgICAgICB0aGlzLmVtaXRFY2hvcygpO1xuICAgICAgfSk7XG4gIH1cbiAgLy9cbiAgLy8gZ2V0TmJFY2hvcygpIHtcbiAgLy8gICB0aGlzLm5iTXNnID0gMDsgLy8gcmUgaW5pdFxuICAvLyAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gIC8vICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpLm9uKCd2YWx1ZScsIChtZXNzYWdlKSA9PiB7XG4gIC8vICAgICAgIGlmIChtZXNzYWdlLnZhbCgpID09IG51bGwpIHsgLy8gREIgdmlkZVxuICAvLyAgICAgICAgIHJldHVybiB0aGlzLm5iTXNnO1xuICAvLyAgICAgICB9IGVsc2UgeyAvLyBEQiBub24gdmlkZVxuICAvLyAgICAgICAgIG1lc3NhZ2UudmFsKCkuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgLy8gICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gIC8vICAgICAgICAgICAgIHRoaXMubmJNc2crKztcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9KVxuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5uYk1zZztcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyBwdXNoRWNob3MoKSB7XG4gIC8vICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAvLyAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAvLyAgICAgICBsZXQgY291bnQgPSAwO1xuICAvLyAgICAgICB2YXIgZWNob3MgPSBbXSAvLyByZSBpbml0XG4gIC8vICAgICAgIGlmIChmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL21zZycpKSB7XG4gIC8vICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy9tc2cnKS5vbigndmFsdWUnLCAobWVzc2FnZSkgPT4ge1xuICAvLyAgICAgICAgICAgaWYgKG1lc3NhZ2UudmFsKCkgPT0gbnVsbCkgeyAvLyBEQiB2aWRlXG4gIC8vICAgICAgICAgICAgIHJlc29sdmUoZWNob3MpO1xuICAvLyAgICAgICAgICAgfSBlbHNlIHsgLy8gREIgbm9uIHZpZGVcbiAgLy8gICAgICAgICAgICAgbWVzc2FnZS52YWwoKS5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAvLyAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gIC8vICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdtZXNzYWdlIHByZXNlbnQnICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAvLyAgICAgICAgICAgICAgICAgZWNob3MucHVzaChtZXNzYWdlKTtcbiAgLy8gICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSB0aGlzLm5iTXNnKSB7XG4gIC8vICAgICAgICAgICAgICAgICByZXNvbHZlKGVjaG9zKTtcbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICByZXNvbHZlKGVjaG9zKTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgIClcbiAgLy8gfVxuXG4gIC8vIHNldEVjaG9zKGVjaG9zKSB7XG4gIC8vICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAvLyAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAvLyAgICAgICBsZXQgYWxsRWNob3MgPSBKU09OLnN0cmluZ2lmeShlY2hvcyk7XG4gIC8vICAgICAgIGxldCBhbGxFY2hvc0FycmF5ID0gSlNPTi5wYXJzZShhbGxFY2hvcyk7XG4gIC8vICAgICAgIHRoaXMuZWNob3MgPSBhbGxFY2hvc0FycmF5O1xuICAvLyAgICAgICByZXNvbHZlKCk7XG4gIC8vICAgICB9XG4gIC8vICAgKVxuICAvLyB9XG4gIC8vXG4gIC8vIGdldEVjaG9zKCkge1xuICAvLyAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgLy8gICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgLy8gICAgICAgdGhpcy5nZXROYkVjaG9zKCk7XG4gIC8vICAgICAgIHRoaXMucHVzaEVjaG9zKCkudGhlbigoZWNob3MpID0+IHtcbiAgLy8gICAgICAgICB0aGlzLnNldEVjaG9zKGVjaG9zKS50aGVuKCgpID0+IHtcbiAgLy8gICAgICAgICAgIHJlc29sdmUoKTtcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICB9KVxuICAvLyAgICAgfVxuICAvLyAgIClcbiAgLy8gfVxuXG5cblxuICAvLyBnZXRFY2hvc1JhbmdlKCkge1xuICAvLyAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgLy8gICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgLy8gICAgICAgdGhpcy5nZXRFY2hvcygpLnRoZW4oKCkgPT4ge1xuICAvLyAgICAgICAgIHRoaXMuZWNob3NQb3J0ZWUgPSBbXTtcbiAgLy8gICAgICAgICBsZXQgZWNob3MgPSB0aGlzLmVjaG9zO1xuICAvLyAgICAgICAgIGVjaG9zLmZvckVhY2goZWNobyA9PiB7XG4gIC8vICAgICAgICAgICB0aGlzLmVjaG9zUG9ydGVlLnB1c2godGhpcy5jb21wYXJlRGlzdGFuY2UoZWNobywgdGhpcy5nZW9sb2NhdGlvblNlcnZpY2UubG9jYXRpb24pKTtcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgICAgICByZXNvbHZlKCk7XG4gIC8vICAgICAgIH0pXG4gIC8vICAgICB9KVxuICAvLyB9XG5cbiAgLy8gY29tcGFyZURpc3RhbmNlKGVsZW1lbnQsIHVzckxvY2F0aW9uKSB7XG4gIC8vICAgbGV0IG1zZ0xvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAvLyAgIG1zZ0xvY2F0aW9uLmxhdGl0dWRlID0gZWxlbWVudC5sYXRpdHVkZTtcbiAgLy8gICBtc2dMb2NhdGlvbi5sb25naXR1ZGUgPSBlbGVtZW50LmxvbmdpdHVkZTtcbiAgLy8gICBsZXQgdXNlckxvY2F0aW9uOiBMb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAvLyAgIHVzZXJMb2NhdGlvbi5sYXRpdHVkZSA9IHVzckxvY2F0aW9uLmxhdGl0dWRlO1xuICAvLyAgIHVzZXJMb2NhdGlvbi5sb25naXR1ZGUgPSB1c3JMb2NhdGlvbi5sb25naXR1ZGU7XG4gIC8vICAgbGV0IGRpc3RhbmNlID0gZ2VvTG9jYXRpb24uZGlzdGFuY2UobXNnTG9jYXRpb24sIHVzZXJMb2NhdGlvbik7XG4gIC8vICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5wb3J0ZWUpIHtcbiAgLy8gICAgIHJldHVybiBlbGVtZW50O1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGNyZWF0ZU5ld0VjaG8obmV3RWNobzogRWNobykge1xuICAgIHRoaXMuZWNob3MudW5zaGlmdChuZXdFY2hvKTtcbiAgICB0aGlzLmVjaG9zUG9ydGVlLnVuc2hpZnQobmV3RWNobyk7XG5cbiAgICB0aGlzLnNhdmVFY2hvcygpO1xuICAgIHRoaXMuZW1pdEVjaG9zKCk7XG4gICAgdGhpcy5lbWl0RWNob3NQb3J0ZWUoKTtcblxuICB9XG5cbiAgZ2V0RWNobyhpZEVjaG8pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvbXNnLycgKyBpZEVjaG8pLm9uY2UoJ3ZhbHVlJykudGhlbihcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnZhbCgpKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICB1cGxvYWRGaWxlKGxvY2FsUGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJJZCgpICsgRGF0ZS5ub3coKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgcmVtb3RlUGF0aCA9IGAke2ZpbGVuYW1lfWA7XG4gICAgICAgIHJldHVybiBmaXJlYmFzZS51cGxvYWRGaWxlKHtcbiAgICAgICAgICByZW1vdGVGdWxsUGF0aDogcmVtb3RlUGF0aCwgLy8gc3VyIHF1ZWwgbm9ldWQgZGUgZmlyZWJhc2UgamUgbCdlbnZvaVxuICAgICAgICAgIGxvY2FsRnVsbFBhdGg6IGxvY2FsUGF0aCwgLy8gb3UgamUgY2hlcmNoZSBsJ2ltYWdlXG4gICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgKHVwbG9hZGVkRmlsZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh1cGxvYWRlZEZpbGUpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICApXG4gIH1cblxufVxuIl19