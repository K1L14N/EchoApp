"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contacts = require("nativescript-contacts");
var permissions = require("nativescript-permissions");
var ContactsService = /** @class */ (function () {
    function ContactsService() {
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
    ContactsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ContactsService);
    return ContactsService;
}());
exports.ContactsService = ContactsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFHaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFHdEQ7SUFJSTtJQUFnQixDQUFDO0lBRWpCLGlDQUFPLEdBQVA7UUFDSSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2QsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNaLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLDJDQUEyQyxDQUFDO2lCQUNoSyxJQUFJLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUE7SUFFTCxDQUFDO0lBRUQsNENBQWtCLEdBQWxCO1FBQUEsaUJBcUJDO1FBcEJHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUMzQyxpQkFBaUI7WUFDakIsaURBQWlEO1lBQ2pELDZGQUE2RjtZQUV6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQywwQkFBMEI7Z0JBRW5ELHVEQUF1RDtnQkFDdkQsd0NBQXdDO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ2xELHlEQUF5RDtnQkFFN0QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixtREFBbUQ7b0JBQ25ELEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO1lBQ0wsQ0FBQztRQUNELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTVDUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7O09BQ0EsZUFBZSxDQThDM0I7SUFBRCxzQkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xudmFyIGNvbnRhY3RzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1jb250YWN0c1wiKTtcblxuZGVjbGFyZSB2YXIgYW5kcm9pZDphbnk7XG52YXIgcGVybWlzc2lvbnMgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBlcm1pc3Npb25zXCIpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29udGFjdHNTZXJ2aWNlIHtcblxuICAgIG5ld0NvbnRhY3Q6IFN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICByZXFQZXJtKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfQ09OVEFDVFMsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5XUklURV9DT05UQUNUUywgXCJJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnMgYmVjYXVzZSBJJ20gY29vbFwiKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvbyBIb28sIEkgaGF2ZSB0aGUgcG93ZXIhXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVWggb2gsIG5vIHBlcm1pc3Npb25zIC0gcGxhbiBCIHRpbWUhXCIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBcbiAgICB9XG5cbiAgICBzZWxlY3RDb250YWN0VG9BZGQoKSB7XG4gICAgICAgIHJldHVybiBjb250YWN0cy5nZXRDb250YWN0KCkudGhlbigoYXJncykgPT4ge1xuICAgIC8vLyBSZXR1cm5zIGFyZ3M6XG4gICAgLy8vIGFyZ3MuZGF0YTogR2VuZXJpYyBjcm9zcyBwbGF0Zm9ybSBKU09OIG9iamVjdFxuICAgIC8vLyBhcmdzLnJlcG9uc2U6IFwic2VsZWN0ZWRcIiBvciBcImNhbmNlbGxlZFwiIGRlcGVuZGluZyBvbiB3aGV0ZXIgdGhlIHVzZXIgc2VsZWN0ZWQgYSBjb250YWN0LiBcbiAgICAgIFxuICAgICAgICBpZiAoYXJncy5yZXNwb25zZSA9PT0gXCJzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICB2YXIgY29udGFjdCA9IGFyZ3MuZGF0YTsgLy9TZWUgZGF0YSBzdHJ1Y3R1cmUgYmVsb3dcbiAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGxldHMgc2F5IHlvdSB3YW50ZWQgdG8gZ3JhYiBmaXJzdCBuYW1lIGFuZCBsYXN0IG5hbWVcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNvbnRhY3QpKTtcbiAgICAgICAgICAgIGlmIChjb250YWN0LmVtYWlsQWRkcmVzc2VzWzBdLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdDb250YWN0ID0gY29udGFjdC5lbWFpbEFkZHJlc3Nlc1swXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY29udGFjdCBkdSBzZXJ2aWNlIDogXCIgKyB0aGlzLm5ld0NvbnRhY3QpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdQYXMgZFxcJ2VtYWlsIGFzc29jacOpIMOgIGNlIGNvbnRhY3QnKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUGFzIGRcXCdlbWFpbCBhc3NvY2nDqSDDoCBjZSBjb250YWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=