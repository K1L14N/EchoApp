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
        return firebaseWebApi.auth().currentUser.uid;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLG1DQUFpQztBQUNqQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRS9CLHVDQUFzQztBQUV0QyxpRUFBb0U7QUFHcEU7SUFJRTtRQUZBLFVBQUssR0FBUyxJQUFJLFdBQUksRUFBRSxDQUFDO0lBSXpCLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsSUFBVTtRQUN0QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2hCLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDZCxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM1RSxJQUFJLENBQ0g7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQztRQUNOLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDaEIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNkLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3hFLElBQUksQ0FDSDtnQkFDRSxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxP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VSxFQUFFOztPQUNBLFdBQVcsQ0FzSXZCO0lBQUQsa0JBQUM7Q0FBQSxBQXRJRCxJQXNJQztBQXRJWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2NhdGNoXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXJcIjtcblxuaW1wb3J0IGZpcmViYXNlV2ViQXBpID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHAnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBfdXNlcjogVXNlciA9IG5ldyBVc2VyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIGNyZWF0ZU5ld1VzZXIodXNlcjogVXNlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlyZWJhc2VXZWJBcGkuYXV0aCgpLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCh1c2VyLmVtYWlsLCB1c2VyLnBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2lnbkluVXNlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaXJlYmFzZVdlYkFwaS5hdXRoKCkuc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQodXNlci5lbWFpbCwgdXNlci5wYXNzd29yZClcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHNpZ25PdXRVc2VyKCkge1xuICAgIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5zaWduT3V0KCk7XG4gICAgdGhpcy5fdXNlciA9IG5ldyBVc2VyKCk7XG4gIH1cblxuICBpbml0VXNlcigpIHtcbiAgICBsZXQgdXNlciA9IGZpcmViYXNlV2ViQXBpLmF1dGgoKS5jdXJyZW50VXNlcjtcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICB0aGlzLl91c2VyLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICB0aGlzLl91c2VyLnVpZCA9IHVzZXIudWlkO1xuICAgIHRoaXMuX3VzZXIuY3VycmVudExvZ2luID0gbm93O1xuICAgIHRoaXMuZ2V0Q29udGFjdHMoKTtcbiAgICB0aGlzLmdldExhc3RMb2dpbigpLnRoZW4oKCkgPT4geyB0aGlzLnVwZGF0ZVVzZXJEQigpIH0pO1xuICAgIH1cblxuXG4gIHVwZGF0ZVVzZXJEQigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgZmlyZWJhc2VXZWJBcGkuZGF0YWJhc2UoKS5yZWYoJy91c2VyLycgKyB0aGlzLmdldFVzZXJJZCgpKS5zZXQodGhpcy5fdXNlcilcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldExhc3RMb2dpbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvdXNlci8nICsgdGhpcy5nZXRVc2VySWQoKSArICcvY3VycmVudExvZ2luJykub25jZSgndmFsdWUnKS50aGVuKFxuICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl91c2VyLmxhc3RMb2dpbiA9IGRhdGEudmFsKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLnZhbCgpKSk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS52YWwoKSk7XG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QgKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldFVzZXJJZCgpIHtcbiAgICByZXR1cm4gZmlyZWJhc2VXZWJBcGkuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZDtcbiAgfVxuXG4gIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIGZpcmViYXNlV2ViQXBpLmF1dGgoKS5jdXJyZW50VXNlcjtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRhY3RzKGNvbnRhY3RzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvdXNlci8nICsgdGhpcy5nZXRVc2VySWQoKSArICcvY29udGFjdHMnKS5zZXQoY29udGFjdHMpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRDb250YWN0c0RCKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIGNvbnRhY3RzID0gW107XG4gICAgICAgIGZpcmViYXNlV2ViQXBpLmRhdGFiYXNlKCkucmVmKCcvdXNlci8nICsgdGhpcy5nZXRVc2VySWQoKSArICcvY29udGFjdHMnKVxuICAgICAgICAgIC5vbigndmFsdWUnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEudmFsKCkpIHtcbiAgICAgICAgICAgICAgZGF0YS52YWwoKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnRhY3RzLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVzb2x2ZShjb250YWN0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cblxuICBnZXRDb250YWN0cygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0Q29udGFjdHNEQigpLnRoZW4oKGFyZ3MpID0+IHtcbiAgICAgICAgdGhpcy5fdXNlci5jb250YWN0cyA9IGFyZ3M7XG4gICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICB9KVxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==