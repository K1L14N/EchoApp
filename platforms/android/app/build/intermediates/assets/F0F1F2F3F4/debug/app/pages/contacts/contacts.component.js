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
        this.contactsService.getContactsDB();
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
        this.contactsService.getContactsDB();
        this.contacts = this.contactsService.myContacts;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFjdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLG9FQUFrRTtBQUNsRSw0REFBMEQ7QUFVMUQ7SUFLQywyQkFDUyxlQUFnQyxFQUNoQyxXQUF3QjtRQUR4QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFMakMsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQVksS0FBSyxDQUFDO0lBSVksQ0FBQztJQUV0QyxvQ0FBUSxHQUFSO1FBQUEsaUJBSUM7UUFIQSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRTthQUM3QixJQUFJLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUFBLGlCQWdCQztRQWZBLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUU7YUFDeEMsSUFBSSxDQUFDO1lBQ0wsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxPQUFPO1FBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO0lBQ2pELENBQUM7SUFqRFcsaUJBQWlCO1FBUjdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxFQUFFLDBCQUFXLENBQUM7WUFDekMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDdkMsQ0FBQzt5Q0FReUIsa0NBQWU7WUFDbkIsMEJBQVc7T0FQckIsaUJBQWlCLENBa0Q3QjtJQUFELHdCQUFDO0NBQUEsQUFsREQsSUFrREM7QUFsRFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRhY3RzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbnRhY3RzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjb250YWN0cycsXG5cdHRlbXBsYXRlVXJsOiAnLi9jb250YWN0cy5jb21wb25lbnQuaHRtbCcsXG5cdHByb3ZpZGVyczogW0NvbnRhY3RzU2VydmljZSwgVXNlclNlcnZpY2VdLFxuXHRzdHlsZVVybHM6IFsnLi9jb250YWN0cy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBDb250YWN0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cblx0Y29udGFjdHM6IGFueSA9IFtdO1xuXHRwcmVzZW50OiBCb29sZWFuID0gZmFsc2U7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBjb250YWN0c1NlcnZpY2U6IENvbnRhY3RzU2VydmljZSxcblx0XHRwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1x0fVxuXG5cdG5nT25Jbml0KCkgeyBcblx0XHR0aGlzLmNvbnRhY3RzU2VydmljZS5yZXFQZXJtKClcblx0XHQudGhlbigoKSA9PiB7IHRoaXMuc2hvd0NvbnRhY3RzKCk7IH0pO1xuXHRcdHRoaXMuY29udGFjdHNTZXJ2aWNlLmdldENvbnRhY3RzREIoKTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLnVzZXJTZXJ2aWNlLmdldENvbnRhY3RzKCk7XG5cdH1cblxuXHRmaW5kQ29udGFjdHMoKSB7XG5cdFx0dGhpcy5jb250YWN0c1NlcnZpY2Uuc2VsZWN0Q29udGFjdFRvQWRkKClcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLmNvbnRhY3RzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdGlmIChlbGVtZW50ID09IHRoaXMuY29udGFjdHNTZXJ2aWNlLm5ld0NvbnRhY3QpIHtcblx0XHRcdFx0XHR0aGlzLnByZXNlbnQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0aWYgKCF0aGlzLnByZXNlbnQpIHtcblx0XHRcdFx0dGhpcy5jb250YWN0cy5wdXNoKHRoaXMuY29udGFjdHNTZXJ2aWNlLm5ld0NvbnRhY3QpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWxlcnQoXCJDZSBjb250YWN0IGVzdCBkw6lqw6AgcHLDqXNlbnQgZGFucyBsYSBsaXN0ZVwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJEw6lqw6AgcHLDqXNlbnQgZGFucyBsYSBsaXN0ZVwiKTtcblx0XHRcdFx0dGhpcy5wcmVzZW50ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdGRlbGV0ZShjb250YWN0KSB7XG5cdFx0bGV0IGluZGV4ID0gdGhpcy5jb250YWN0cy5pbmRleE9mKGNvbnRhY3QpO1xuXHRcdHRoaXMuY29udGFjdHMuc3BsaWNlKGluZGV4LCAxKTtcdFxuXHR9XG5cblx0c2F2ZSgpIHtcblx0XHR0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZUNvbnRhY3RzKHRoaXMuY29udGFjdHMpO1xuXHR9XG5cblx0c2hvd0NvbnRhY3RzKCkge1xuXHRcdHRoaXMuY29udGFjdHNTZXJ2aWNlLmdldENvbnRhY3RzREIoKTtcblx0XHR0aGlzLmNvbnRhY3RzID0gdGhpcy5jb250YWN0c1NlcnZpY2UubXlDb250YWN0cztcblx0fVxufSJdfQ==