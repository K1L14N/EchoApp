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
            _this.LLogin = "Derniere connexion le " + lastco2[0] + " " + lastco2[1] + " a " + lastco2[4] + " : " + lastco2[3] + " : " + lastco2[3];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2ZpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNERBQTBEO0FBQzFELDBDQUF5QztBQVV6QztJQUtFLHlCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUg1QyxVQUFLLEdBQVEsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQVEsRUFBRSxDQUFDO0lBR2pCLENBQUM7SUFHRCxrQ0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQzNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsTUFBTSxHQUFHLHdCQUF3QixHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RILENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQWpCVSxlQUFlO1FBUjNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNyQyxTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1NBQ3pCLENBQUM7eUNBT2lDLDBCQUFXO09BTGpDLGVBQWUsQ0FrQjNCO0lBQUQsc0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztBQWxCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3Byb2ZpbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9maWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcm9maWwuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBQcm9maWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIF91c2VyOiBhbnkgPSBuZXcgVXNlcigpO1xuICBMTG9naW46IGFueSA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpO1xuICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0TGFzdExvZ2luKCkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0bGV0IGxhc3RjbzEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgIGxldCBsYXN0Y28yID0gSlNPTi5wYXJzZShsYXN0Y28xKTtcbiAgICAgIHRoaXMuTExvZ2luID0gXCJEZXJuaWVyZSBjb25uZXhpb24gbGUgXCIrbGFzdGNvMlswXStcIiBcIitsYXN0Y28yWzFdK1wiIGEgXCIrbGFzdGNvMls0XStcIiA6IFwiK2xhc3RjbzJbM10rXCIgOiBcIitsYXN0Y28yWzNdO1xuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==