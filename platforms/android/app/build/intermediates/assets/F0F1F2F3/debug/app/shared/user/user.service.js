"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
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
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUV4RCxtQ0FBaUM7QUFDakMsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUkvQixpRUFBb0U7QUFHcEU7SUFDRSxxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBRyxDQUFDO0lBRWxDLG1DQUFhLEdBQWIsVUFBYyxJQUFVO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQzVFLElBQUksQ0FDSDtnQkFDRSxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLElBQVU7UUFDbkIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUNoQixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2QsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDeEUsSUFBSSxDQUNIO2dCQUNFLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxFQUNELFVBQUMsS0FBSztnQkFDSixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUNGLENBQUM7UUFDTixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0UsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFyQ1UsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUVlLFdBQUk7T0FEbkIsV0FBVyxDQXVDdkI7SUFBRCxrQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2hcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXJcIjtcblxuaW1wb3J0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHAnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7fVxuXG4gIGNyZWF0ZU5ld1VzZXIodXNlcjogVXNlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuYXV0aCgpLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2lnbkluVXNlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlci5lbWFpbCwgdXNlci5wYXNzd29yZClcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25PdXRVc2VyKCkge1xuICAgIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5zaWduT3V0KCk7XG4gIH1cbiAgXG59XG4iXX0=