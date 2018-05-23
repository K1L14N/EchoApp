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
        this._user = this.userService.getUser();
        this.userService.getLastLogin().then(function (data) {
            console.log(JSON.stringify(data));
            var lastco = JSON.parse(JSON.stringify(data)).toString();
            // this.LLogin = "Derniere connexion le "+lastco.day.toString()+" "+latco.month.toString()+" a "+lastco.hours.toString()+" : "+lastco.minutes.toString()+" : "+lastco.seconds.toString();
            console.log(JSON.stringify(lastco));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2ZpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNERBQTBEO0FBQzFELDBDQUF5QztBQVV6QztJQUtFLHlCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUg1QyxVQUFLLEdBQVEsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQVEsRUFBRSxDQUFDO0lBR2pCLENBQUM7SUFHRCxrQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6RCx5TEFBeUw7WUFDekwsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBbEJVLGVBQWU7UUFSM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7U0FDekIsQ0FBQzt5Q0FPaUMsMEJBQVc7T0FMakMsZUFBZSxDQW1CM0I7SUFBRCxzQkFBQztDQUFBLEFBbkJELElBbUJDO0FBbkJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXJcIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncHJvZmlsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2ZpbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb2ZpbC5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2ZpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgX3VzZXI6IGFueSA9IG5ldyBVc2VyKCk7XG4gIExMb2dpbjogYW55ID0gXCJcIjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl91c2VyID0gdGhpcy51c2VyU2VydmljZS5nZXRVc2VyKCk7XG4gICAgdGhpcy51c2VyU2VydmljZS5nZXRMYXN0TG9naW4oKS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICAgIHZhciBsYXN0Y28gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKS50b1N0cmluZygpO1xuICAgICAgLy8gdGhpcy5MTG9naW4gPSBcIkRlcm5pZXJlIGNvbm5leGlvbiBsZSBcIitsYXN0Y28uZGF5LnRvU3RyaW5nKCkrXCIgXCIrbGF0Y28ubW9udGgudG9TdHJpbmcoKStcIiBhIFwiK2xhc3Rjby5ob3Vycy50b1N0cmluZygpK1wiIDogXCIrbGFzdGNvLm1pbnV0ZXMudG9TdHJpbmcoKStcIiA6IFwiK2xhc3Rjby5zZWNvbmRzLnRvU3RyaW5nKCk7XG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsYXN0Y28pKTtcbiAgICB9KTtcblxuICB9XG59XG4iXX0=