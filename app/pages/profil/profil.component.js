"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var user_1 = require("../../models/user");
var ProfilComponent = /** @class */ (function () {
    function ProfilComponent(userService) {
        this.userService = userService;
        this._user = new user_1.User();
        this.LLogin = "";
    }
    ProfilComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._user = this.userService.getUser();
        this.userService.getLastLogin().then(function (data) {
            var lastco1 = JSON.stringify(data);
            var lastco2 = JSON.parse(lastco1);
            _this.LLogin = "Derniere connexion le " + lastco2.day + "/0" + (lastco2.month + 1) + " à " + lastco2.hours + " : " + lastco2.minutes;
        });
    };
    ProfilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profil',
            templateUrl: './profil.component.html',
            styleUrls: ['./profil.component.css'],
            providers: [user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], ProfilComponent);
    return ProfilComponent;
}());
exports.ProfilComponent = ProfilComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2ZpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNERBQTBEO0FBQzFELDBDQUF5QztBQVV6QztJQUtFLHlCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUg1QyxVQUFLLEdBQVEsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQVEsRUFBRSxDQUFDO0lBR2pCLENBQUM7SUFHRCxrQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQzNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsTUFBTSxHQUFHLHdCQUF3QixHQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsSUFBSSxHQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUN0SCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFqQlUsZUFBZTtRQVIzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztTQUN6QixDQUFDO3lDQU9pQywwQkFBVztPQUxqQyxlQUFlLENBa0IzQjtJQUFELHNCQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdwcm9maWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZmlsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZmlsLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgUHJvZmlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBfdXNlcjogYW55ID0gbmV3IFVzZXIoKTtcbiAgTExvZ2luOiBhbnkgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3VzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKTtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldExhc3RMb2dpbigpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdGxldCBsYXN0Y28xID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICBsZXQgbGFzdGNvMiA9IEpTT04ucGFyc2UobGFzdGNvMSk7XG4gICAgICB0aGlzLkxMb2dpbiA9IFwiRGVybmllcmUgY29ubmV4aW9uIGxlIFwiK2xhc3RjbzIuZGF5K1wiLzBcIisobGFzdGNvMi5tb250aCsxKStcIiDDoCBcIitsYXN0Y28yLmhvdXJzK1wiIDogXCIrbGFzdGNvMi5taW51dGVzO1xuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==