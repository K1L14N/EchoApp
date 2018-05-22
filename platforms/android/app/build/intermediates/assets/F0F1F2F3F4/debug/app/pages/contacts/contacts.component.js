"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contacts_service_1 = require("../../services/contacts.service");
var user_service_1 = require("../../services/user.service");
var ContactsComponent = /** @class */ (function () {
    function ContactsComponent(contactsService, userService) {
        this.contactsService = contactsService;
        this.userService = userService;
        this.contacts = [];
        this.present = false;
    }
    ContactsComponent.prototype.ngOnInit = function () { };
    ContactsComponent.prototype.findContacts = function () {
        var _this = this;
        this.contactsService.selectContactToAdd()
            .then(function () {
            _this.contacts.forEach(function (element) {
                if (element == _this.contactsService.newContact) {
                    _this.present = true;
                }
            });
            if (!_this.present) {
                _this.contacts.push(_this.contactsService.newContact);
                console.log(_this.contacts);
            }
            else {
                alert("Ce contact est déjà présent dans la liste");
                console.log("Déjà présent dans la liste");
                _this.present = false;
            }
        });
    };
    ContactsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contacts',
            templateUrl: './contacts.component.html',
            providers: [contacts_service_1.ContactsService, user_service_1.UserService],
            styleUrls: ['./contacts.component.css']
        }),
        __metadata("design:paramtypes", [contacts_service_1.ContactsService,
            user_service_1.UserService])
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG9FQUFrRTtBQUNsRSw0REFBMEQ7QUFVMUQ7SUFLQywyQkFDUyxlQUFnQyxFQUNoQyxXQUF3QjtRQUR4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMakMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFJWSxDQUFDO0lBRXRDLG9DQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsd0NBQVksR0FBWjtRQUFBLGlCQWtCQztRQWpCQSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFO2FBQ3hDLElBQUksQ0FBQztZQUNMLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN0QixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBN0JXLGlCQUFpQjtRQVI3QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsa0NBQWUsRUFBRSwwQkFBVyxDQUFDO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQ3ZDLENBQUM7eUNBUXlCLGtDQUFlO1lBQ25CLDBCQUFXO09BUHJCLGlCQUFpQixDQStCN0I7SUFBRCx3QkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250YWN0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb250YWN0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY29udGFjdHMnLFxuXHR0ZW1wbGF0ZVVybDogJy4vY29udGFjdHMuY29tcG9uZW50Lmh0bWwnLFxuXHRwcm92aWRlcnM6IFtDb250YWN0c1NlcnZpY2UsIFVzZXJTZXJ2aWNlXSxcblx0c3R5bGVVcmxzOiBbJy4vY29udGFjdHMuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQ29udGFjdHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdGNvbnRhY3RzID0gW107XG5cdHByZXNlbnQ6IEJvb2xlYW4gPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGNvbnRhY3RzU2VydmljZTogQ29udGFjdHNTZXJ2aWNlLFxuXHRcdHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XHR9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRmaW5kQ29udGFjdHMoKSB7XG5cdFx0dGhpcy5jb250YWN0c1NlcnZpY2Uuc2VsZWN0Q29udGFjdFRvQWRkKClcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLmNvbnRhY3RzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdGlmIChlbGVtZW50ID09IHRoaXMuY29udGFjdHNTZXJ2aWNlLm5ld0NvbnRhY3QpIHtcblx0XHRcdFx0XHR0aGlzLnByZXNlbnQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0aWYgKCF0aGlzLnByZXNlbnQpIHtcblx0XHRcdFx0dGhpcy5jb250YWN0cy5wdXNoKHRoaXMuY29udGFjdHNTZXJ2aWNlLm5ld0NvbnRhY3QpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnRhY3RzKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWxlcnQoXCJDZSBjb250YWN0IGVzdCBkw6lqw6AgcHLDqXNlbnQgZGFucyBsYSBsaXN0ZVwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJEw6lqw6AgcHLDqXNlbnQgZGFucyBsYSBsaXN0ZVwiKTtcblx0XHRcdFx0dGhpcy5wcmVzZW50ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG59Il19