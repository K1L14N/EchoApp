"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("./user.service");
var contacts = require("nativescript-contacts");
var permissions = require("nativescript-permissions");
var ContactsService = /** @class */ (function () {
    function ContactsService(userService) {
        this.userService = userService;
        this.myContacts = [];
    }
    ContactsService.prototype.reqPerm = function () {
        return new Promise(function (resolve, reject) {
            permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, "I need these permissions because I'm cool")
                .then(function () {
                console.log("Woo Hoo, I have the power!");
                resolve();
            })
                .catch(function () {
                console.log("Uh oh, no permissions - plan B time!");
                reject();
            });
        });
    };
    ContactsService.prototype.selectContactToAdd = function () {
        var _this = this;
        return contacts.getContact().then(function (args) {
            /// Returns args:
            /// args.data: Generic cross platform JSON object
            /// args.reponse: "selected" or "cancelled" depending on wheter the user selected a contact. 
            if (args.response === "selected") {
                var contact = args.data; //See data structure below
                // lets say you wanted to grab first name and last name
                // console.log(JSON.stringify(contact));
                if (contact.emailAddresses[0].value) {
                    _this.newContact = contact.emailAddresses[0].value;
                    //console.log("contact du service : " + this.newContact);
                }
                else {
                    //console.log('Pas d\'email associé à ce contact');
                    alert('Pas d\'email associé à ce contact');
                }
            }
        });
    };
    ContactsService.prototype.getContactsDB = function () {
        var _this = this;
        this.userService.getContacts()
            .then(function (contacts) {
            _this.myContacts = contacts;
        });
    };
    ContactsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], ContactsService);
    return ContactsService;
}());
exports.ContactsService = ContactsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsK0NBQTZDO0FBRTdDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBR2hELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBR3REO0lBS0kseUJBQ1ksV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFIcEMsZUFBVSxHQUFRLEVBQUUsQ0FBQztJQUlqQixDQUFDO0lBRUwsaUNBQU8sR0FBUDtRQUNJLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FDZCxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ1osV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsMkNBQTJDLENBQUM7aUJBQ2hLLElBQUksQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0osQ0FBQTtJQUVMLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEI7UUFBQSxpQkFxQkM7UUFwQkcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQzNDLGlCQUFpQjtZQUNqQixpREFBaUQ7WUFDakQsNkZBQTZGO1lBRXpGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLDBCQUEwQjtnQkFFbkQsdURBQXVEO2dCQUN2RCx3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDbEQseURBQXlEO2dCQUU3RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLG1EQUFtRDtvQkFDbkQsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQy9DLENBQUM7WUFDTCxDQUFDO1FBQ0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUNBQWEsR0FBYjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7YUFDekIsSUFBSSxDQUFDLFVBQUMsUUFBUTtZQUNYLEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQXREUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBT2dCLDBCQUFXO09BTjNCLGVBQWUsQ0F3RDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGZpcmViYXNlV2ViQXBpIGZyb20gJ25hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyJztcbnZhciBjb250YWN0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY29udGFjdHNcIik7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6YW55O1xudmFyIHBlcm1pc3Npb25zID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRhY3RzU2VydmljZSB7XG5cbiAgICBuZXdDb250YWN0OiBTdHJpbmc7XG4gICAgbXlDb250YWN0czogYW55ID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgcmVxUGVybSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX0NPTlRBQ1RTLCBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uV1JJVEVfQ09OVEFDVFMsIFwiSSBuZWVkIHRoZXNlIHBlcm1pc3Npb25zIGJlY2F1c2UgSSdtIGNvb2xcIilcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb28gSG9vLCBJIGhhdmUgdGhlIHBvd2VyIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVoIG9oLCBubyBwZXJtaXNzaW9ucyAtIHBsYW4gQiB0aW1lIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2VsZWN0Q29udGFjdFRvQWRkKCkge1xuICAgICAgICByZXR1cm4gY29udGFjdHMuZ2V0Q29udGFjdCgpLnRoZW4oKGFyZ3MpID0+IHtcbiAgICAvLy8gUmV0dXJucyBhcmdzOlxuICAgIC8vLyBhcmdzLmRhdGE6IEdlbmVyaWMgY3Jvc3MgcGxhdGZvcm0gSlNPTiBvYmplY3RcbiAgICAvLy8gYXJncy5yZXBvbnNlOiBcInNlbGVjdGVkXCIgb3IgXCJjYW5jZWxsZWRcIiBkZXBlbmRpbmcgb24gd2hldGVyIHRoZSB1c2VyIHNlbGVjdGVkIGEgY29udGFjdC4gXG4gICAgICBcbiAgICAgICAgaWYgKGFyZ3MucmVzcG9uc2UgPT09IFwic2VsZWN0ZWRcIikge1xuICAgICAgICAgICAgdmFyIGNvbnRhY3QgPSBhcmdzLmRhdGE7IC8vU2VlIGRhdGEgc3RydWN0dXJlIGJlbG93XG4gICAgICAgICAgXG4gICAgICAgICAgICAvLyBsZXRzIHNheSB5b3Ugd2FudGVkIHRvIGdyYWIgZmlyc3QgbmFtZSBhbmQgbGFzdCBuYW1lXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjb250YWN0KSk7XG4gICAgICAgICAgICBpZiAoY29udGFjdC5lbWFpbEFkZHJlc3Nlc1swXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV3Q29udGFjdCA9IGNvbnRhY3QuZW1haWxBZGRyZXNzZXNbMF0udmFsdWU7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNvbnRhY3QgZHUgc2VydmljZSA6IFwiICsgdGhpcy5uZXdDb250YWN0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnUGFzIGRcXCdlbWFpbCBhc3NvY2nDqSDDoCBjZSBjb250YWN0Jyk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1BhcyBkXFwnZW1haWwgYXNzb2Npw6kgw6AgY2UgY29udGFjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENvbnRhY3RzREIoKSB7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0Q29udGFjdHMoKVxuICAgICAgICAgICAgLnRoZW4oKGNvbnRhY3RzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5teUNvbnRhY3RzID0gY29udGFjdHM7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxufVxuIl19