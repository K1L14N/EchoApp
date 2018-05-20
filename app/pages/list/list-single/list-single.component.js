"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var echo_1 = require("../../../shared/echo/echo");
var echo_list_service_1 = require("../../../shared/echo/echo-list.service");
var ListSingleComponent = /** @class */ (function () {
    function ListSingleComponent(echoListService, router, route) {
        this.echoListService = echoListService;
        this.router = router;
        this.route = route;
    }
    ListSingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.echo = new echo_1.Echo();
        var id = this.route.snapshot.params['id'];
        this.echoListService.getEcho(+id).then(function (echo) {
            _this.echo = echo;
        });
    };
    ListSingleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list-single',
            templateUrl: './list-single.html',
            styleUrls: ["./list-single-common.css", "./list-single.css"]
        }),
        __metadata("design:paramtypes", [echo_list_service_1.EchoListService, router_1.Router, router_1.ActivatedRoute])
    ], ListSingleComponent);
    return ListSingleComponent;
}());
exports.ListSingleComponent = ListSingleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zaW5nbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdC1zaW5nbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5RDtBQUN6RCxrREFBaUQ7QUFDakQsNEVBQXlFO0FBU3pFO0lBSUksNkJBQW9CLGVBQWdDLEVBQVUsTUFBYyxFQUFVLEtBQXFCO1FBQXZGLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUFHLENBQUM7SUFFL0csc0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbEMsVUFBQyxJQUFVO1lBQ1AsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBZFEsbUJBQW1CO1FBUC9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLG9CQUFvQjtZQUNqQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxtQkFBbUIsQ0FBQztTQUMvRCxDQUFDO3lDQU11QyxtQ0FBZSxFQUFrQixlQUFNLEVBQWlCLHVCQUFjO09BSmxHLG1CQUFtQixDQWUvQjtJQUFELDBCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBFY2hvIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2VjaG8vZWNobyc7XG5pbXBvcnQgeyBFY2hvTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvZWNoby9lY2hvLWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdsaXN0LXNpbmdsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3Qtc2luZ2xlLmh0bWwnLFxuICAgIHN0eWxlVXJsczogW1wiLi9saXN0LXNpbmdsZS1jb21tb24uY3NzXCIsIFwiLi9saXN0LXNpbmdsZS5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMaXN0U2luZ2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGVjaG86IEVjaG87XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVjaG9MaXN0U2VydmljZTogRWNob0xpc3RTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmVjaG8gPSBuZXcgRWNobygpO1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xuICAgICAgICB0aGlzLmVjaG9MaXN0U2VydmljZS5nZXRFY2hvKCtpZCkudGhlbihcbiAgICAgICAgICAgIChlY2hvOiBFY2hvKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lY2hvID0gZWNobztcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59Il19