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
    ContactsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contactsService.reqPerm()
            .then(function () { _this.showContacts(); });
    };
    ContactsComponent.prototype.ngAfterViewInit = function () {
        this.userService.getContacts();
    };
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
            }
            else {
                alert("Ce contact est déjà présent dans la liste");
                console.log("Déjà présent dans la liste");
                _this.present = false;
            }
        });
    };
    ContactsComponent.prototype.delete = function (contact) {
        var index = this.contacts.indexOf(contact);
        this.contacts.splice(index, 1);
    };
    ContactsComponent.prototype.save = function () {
        this.userService.updateContacts(this.contacts);
    };
    ContactsComponent.prototype.showContacts = function () {
        var _this = this;
        this.userService.getContacts()
            .then(function (args) {
            _this.contacts = args;
            console.log(_this.contacts);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLG9FQUFrRTtBQUNsRSw0REFBMEQ7QUFVMUQ7SUFLQywyQkFDUyxlQUFnQyxFQUNoQyxXQUF3QjtRQUR4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMakMsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQVksS0FBSyxDQUFDO0lBSVksQ0FBQztJQUV0QyxvQ0FBUSxHQUFSO1FBQUEsaUJBR0M7UUFGQSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTthQUM3QixJQUFJLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHdDQUFZLEdBQVo7UUFBQSxpQkFnQkM7UUFmQSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFO2FBQ3hDLElBQUksQ0FBQztZQUNMLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFRCxrQ0FBTSxHQUFOLFVBQU8sT0FBTztRQUNiLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUFBLGlCQU9DO1FBTkEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7YUFDNUIsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFBO0lBRUosQ0FBQztJQXBEVyxpQkFBaUI7UUFSN0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLGtDQUFlLEVBQUUsMEJBQVcsQ0FBQztZQUN6QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztTQUN2QyxDQUFDO3lDQVF5QixrQ0FBZTtZQUNuQiwwQkFBVztPQVByQixpQkFBaUIsQ0FxRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJERCxJQXFEQztBQXJEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udGFjdHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29udGFjdHMuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NvbnRhY3RzJyxcblx0dGVtcGxhdGVVcmw6ICcuL2NvbnRhY3RzLmNvbXBvbmVudC5odG1sJyxcblx0cHJvdmlkZXJzOiBbQ29udGFjdHNTZXJ2aWNlLCBVc2VyU2VydmljZV0sXG5cdHN0eWxlVXJsczogWycuL2NvbnRhY3RzLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENvbnRhY3RzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuXHRjb250YWN0czogYW55ID0gW107XG5cdHByZXNlbnQ6IEJvb2xlYW4gPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGNvbnRhY3RzU2VydmljZTogQ29udGFjdHNTZXJ2aWNlLFxuXHRcdHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XHR9XG5cblx0bmdPbkluaXQoKSB7IFxuXHRcdHRoaXMuY29udGFjdHNTZXJ2aWNlLnJlcVBlcm0oKVxuXHRcdC50aGVuKCgpID0+IHsgdGhpcy5zaG93Q29udGFjdHMoKTsgfSk7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy51c2VyU2VydmljZS5nZXRDb250YWN0cygpO1xuXHR9XG5cblx0ZmluZENvbnRhY3RzKCkge1xuXHRcdHRoaXMuY29udGFjdHNTZXJ2aWNlLnNlbGVjdENvbnRhY3RUb0FkZCgpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0dGhpcy5jb250YWN0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0XHRpZiAoZWxlbWVudCA9PSB0aGlzLmNvbnRhY3RzU2VydmljZS5uZXdDb250YWN0KSB7XG5cdFx0XHRcdFx0dGhpcy5wcmVzZW50ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdGlmICghdGhpcy5wcmVzZW50KSB7XG5cdFx0XHRcdHRoaXMuY29udGFjdHMucHVzaCh0aGlzLmNvbnRhY3RzU2VydmljZS5uZXdDb250YWN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KFwiQ2UgY29udGFjdCBlc3QgZMOpasOgIHByw6lzZW50IGRhbnMgbGEgbGlzdGVcIik7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRMOpasOgIHByw6lzZW50IGRhbnMgbGEgbGlzdGVcIik7XG5cdFx0XHRcdHRoaXMucHJlc2VudCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRkZWxldGUoY29udGFjdCkge1xuXHRcdGxldCBpbmRleCA9IHRoaXMuY29udGFjdHMuaW5kZXhPZihjb250YWN0KTtcblx0XHR0aGlzLmNvbnRhY3RzLnNwbGljZShpbmRleCwgMSk7XHRcblx0fVxuXG5cdHNhdmUoKSB7XG5cdFx0dGhpcy51c2VyU2VydmljZS51cGRhdGVDb250YWN0cyh0aGlzLmNvbnRhY3RzKTtcblx0fVxuXG5cdHNob3dDb250YWN0cygpIHtcblx0XHR0aGlzLnVzZXJTZXJ2aWNlLmdldENvbnRhY3RzKClcblx0XHRcdC50aGVuKChhcmdzKSA9PiB7IFxuXHRcdFx0XHR0aGlzLmNvbnRhY3RzID0gYXJncztcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5jb250YWN0cyk7XG5cdFx0XHR9KVxuXG5cdH1cbn0iXX0=