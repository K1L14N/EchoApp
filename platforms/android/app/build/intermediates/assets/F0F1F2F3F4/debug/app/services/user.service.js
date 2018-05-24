"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var user_1 = require("../models/user");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var UserService = /** @class */ (function () {
    function UserService() {
        this._user = new user_1.User();
    }
    UserService.prototype.createNewUser = function (user) {
        return new Promise(function (resolve, reject) {
            firebaseWebApi.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.signInUser = function (user) {
        return new Promise(function (resolve, reject) {
            firebaseWebApi.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(function () {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.signOutUser = function () {
        firebaseWebApi.auth().signOut();
        this._user = new user_1.User();
    };
    UserService.prototype.initUser = function () {
        var _this = this;
        var user = firebaseWebApi.auth().currentUser;
        var now = new Date();
        //console.log(JSON.stringify(user));
        this._user.email = user.email;
        this._user.uid = user.uid;
        this._user.currentLogin = now;
        this.getContacts();
        this.getLastLogin().then(function () { _this.updateUserDB(); });
    };
    UserService.prototype.updateUserDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this.getUserId()).set(_this._user)
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getLastLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this.getUserId() + '/currentLogin').once('value').then(function (data) {
                _this._user.lastLogin = data.val();
                console.log(JSON.stringify(data.val()));
                resolve(data.val());
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getUserId = function () {
        return (firebaseWebApi.auth().currentUser.uid);
    };
    UserService.prototype.getUserIdProm = function () {
        return new Promise(function (resolve, reject) {
            resolve(firebaseWebApi.auth().currentUser.uid);
        });
    };
    UserService.prototype.getUser = function () {
        return firebaseWebApi.auth().currentUser;
    };
    UserService.prototype.updateContacts = function (contacts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this.getUserId() + '/contacts').set(contacts)
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getContactsDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var contacts = [];
            firebaseWebApi.database().ref('/user/' + _this.getUserId() + '/contacts')
                .on('value', function (data) {
                if (data.val()) {
                    data.val().forEach(function (element) {
                        contacts.push(element);
                    });
                    resolve(contacts);
                }
            });
        });
    };
    UserService.prototype.getContacts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getContactsDB().then(function (args) {
                _this._user.contacts = args;
                resolve(args);
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLG1DQUFpQztBQUNqQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRS9CLHVDQUFzQztBQUV0QyxpRUFBb0U7QUFHcEU7SUFJRTtRQUZBLFVBQUssR0FBUyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBSXpCLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsSUFBVTtRQUN0QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2hCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDZCxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM1RSxJQUFJLENBQ0g7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQztRQUNOLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3hFLElBQUksQ0FDSDtnQkFDRSxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxP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QyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUMvQixLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNGLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQTVJVSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7O09BQ0EsV0FBVyxDQTZJdkI7SUFBRCxrQkFBQztDQUFBLEFBN0lELElBNklDO0FBN0lZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvdXNlclwiO1xuXG5pbXBvcnQgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcCcpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuXG4gIF91c2VyOiBVc2VyID0gbmV3IFVzZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgY3JlYXRlTmV3VXNlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzaWduSW5Vc2VyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2lnbk91dFVzZXIoKSB7XG4gICAgZmlyZWJhc2VXZWJBcGkuYXV0aCgpLnNpZ25PdXQoKTtcbiAgICB0aGlzLl91c2VyID0gbmV3IFVzZXIoKTtcbiAgfVxuXG4gIGluaXRVc2VyKCkge1xuICAgIGxldCB1c2VyID0gZmlyZWJhc2VXZWJBcGkuYXV0aCgpLmN1cnJlbnRVc2VyO1xuICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICAgIHRoaXMuX3VzZXIuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgIHRoaXMuX3VzZXIudWlkID0gdXNlci51aWQ7XG4gICAgdGhpcy5fdXNlci5jdXJyZW50TG9naW4gPSBub3c7XG4gICAgdGhpcy5nZXRDb250YWN0cygpO1xuICAgIHRoaXMuZ2V0TGFzdExvZ2luKCkudGhlbigoKSA9PiB7IHRoaXMudXBkYXRlVXNlckRCKCkgfSk7XG4gICAgfVxuXG5cbiAgdXBkYXRlVXNlckRCKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuZ2V0VXNlcklkKCkpLnNldCh0aGlzLl91c2VyKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFzdExvZ2luKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy91c2VyLycgKyB0aGlzLmdldFVzZXJJZCgpICsgJy9jdXJyZW50TG9naW4nKS5vbmNlKCd2YWx1ZScpLnRoZW4oXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VzZXIubGFzdExvZ2luID0gZGF0YS52YWwoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEudmFsKCkpKTtcblxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnZhbCgpKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCAoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0VXNlcklkKCkge1xuICAgIHJldHVybiAoZmlyZWJhc2VXZWJBcGkuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCk7XG4gIH1cblxuICBnZXRVc2VySWRQcm9tKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZShmaXJlYmFzZVdlYkFwaS5hdXRoKCkuY3VycmVudFVzZXIudWlkKTtcbiAgICAgIH0pXG4gIH1cblxuICBnZXRVc2VyKCkge1xuICAgIHJldHVybiBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuY3VycmVudFVzZXI7XG4gIH1cblxuICB1cGRhdGVDb250YWN0cyhjb250YWN0cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuZ2V0VXNlcklkKCkgKyAnL2NvbnRhY3RzJykuc2V0KGNvbnRhY3RzKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udGFjdHNEQigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBjb250YWN0cyA9IFtdO1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuZ2V0VXNlcklkKCkgKyAnL2NvbnRhY3RzJylcbiAgICAgICAgICAub24oJ3ZhbHVlJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnZhbCgpKSB7XG4gICAgICAgICAgICAgIGRhdGEudmFsKCkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBjb250YWN0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlc29sdmUoY29udGFjdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgZ2V0Q29udGFjdHMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0aGlzLmdldENvbnRhY3RzREIoKS50aGVuKChhcmdzKSA9PiB7XG4gICAgICAgIHRoaXMuX3VzZXIuY29udGFjdHMgPSBhcmdzO1xuICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgfSlcbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=