"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var user_1 = require("../models/user");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
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
    };
    UserService.prototype.initUser = function () {
        var _this = this;
        var user = firebaseWebApi.auth().currentUser;
        var now = new Date();
        //console.log(JSON.stringify(user));
        this._user.email = user.email;
        this._user.uid = user.uid;
        this._user.currentLogin = now;
        return new Promise(function (resolve, reject) {
            _this.getLastLogin().then(function () { _this.updateUserDB(); });
        });
    };
    UserService.prototype.updateUserDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebaseWebApi.database().ref('/user/' + _this._user.uid).set(_this._user)
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
            firebaseWebApi.database().ref('/user/' + _this._user.uid + '/currentLogin').once('value').then(function (data) {
                _this._user.lastLogin = data.val();
                console.log(JSON.stringify(data.val()));
                resolve(data.val());
            }, function (error) {
                reject(error);
            });
        });
    };
    UserService.prototype.getUser = function () {
        return this._user;
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCxtQ0FBaUM7QUFDakMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUUvQix1Q0FBc0M7QUFFdEMsaUVBQW9FO0FBR3BFO0lBSUUscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRnRCLFVBQUssR0FBUyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBRUEsQ0FBQztJQUVsQyxtQ0FBYSxHQUFiLFVBQWMsSUFBVTtRQUN0QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2hCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDZCxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM1RSxJQUFJLENBQ0g7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQztRQUNOLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3hFLElBQUksQ0FDSDtnQkFDRSxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUM3QyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrQ0FBWSxHQUFaO1FBQUEsaUJBV0M7UUFWQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2hCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDWixjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO2lCQUN2RSxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDVixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrQ0FBWSxHQUFaO1FBQUEsaUJBZUM7UUFkQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2hCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDZCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMzRixVQUFDLElBQUk7Z0JBQ0gsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsRUFBRSxVQUFDLEtBQUs7Z0JBQ1AsTUFBTSxDQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUF2RlUsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUtlLFdBQUk7T0FKbkIsV0FBVyxDQXlGdkI7SUFBRCxrQkFBQztDQUFBLEFBekZELElBeUZDO0FBekZZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvdXNlclwiO1xuXG5pbXBvcnQgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcCcpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgX3VzZXI6IFVzZXIgPSBuZXcgVXNlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge31cblxuICBjcmVhdGVOZXdVc2VyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlci5lbWFpbCwgdXNlci5wYXNzd29yZClcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25JblVzZXIodXNlcjogVXNlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuYXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKHVzZXIuZW1haWwsIHVzZXIucGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzaWduT3V0VXNlcigpIHtcbiAgICBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuc2lnbk91dCgpO1xuICB9XG4gIFxuICBpbml0VXNlcigpIHtcbiAgICBsZXQgdXNlciA9IGZpcmViYXNlV2ViQXBpLmF1dGgoKS5jdXJyZW50VXNlcjtcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICB0aGlzLl91c2VyLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICB0aGlzLl91c2VyLnVpZCA9IHVzZXIudWlkO1xuICAgIHRoaXMuX3VzZXIuY3VycmVudExvZ2luID0gbm93O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5nZXRMYXN0TG9naW4oKS50aGVuKCgpID0+IHsgdGhpcy51cGRhdGVVc2VyREIoKSB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVXNlckRCKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBmaXJlYmFzZVdlYkFwaS5kYXRhYmFzZSgpLnJlZignL3VzZXIvJyArIHRoaXMuX3VzZXIudWlkKS5zZXQodGhpcy5fdXNlcilcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldExhc3RMb2dpbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvdXNlci8nICsgdGhpcy5fdXNlci51aWQgKyAnL2N1cnJlbnRMb2dpbicpLm9uY2UoJ3ZhbHVlJykudGhlbihcbiAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXNlci5sYXN0TG9naW4gPSBkYXRhLnZhbCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YS52YWwoKSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEudmFsKCkpO1xuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0IChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXRVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VyO1xuICB9XG5cbn1cbiJdfQ==