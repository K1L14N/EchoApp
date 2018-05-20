"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contacts = require("nativescript-contacts");
var permissions = require("nativescript-permissions");
var ContactsService = /** @class */ (function () {
    function ContactsService() {
    }
    ContactsService.prototype.reqPerm = function () {
        permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, "I need these permissions because I'm cool")
            .then(function () {
            console.log("Woo Hoo, I have the power!");
        })
            .catch(function () {
            console.log("Uh oh, no permissions - plan B time!");
        });
    };
    ContactsService.prototype.selectContactToAdd = function () {
        var _this = this;
        contacts.getContact().then(function (args) {
            /// Returns args:
            /// args.data: Generic cross platform JSON object
            /// args.reponse: "selected" or "cancelled" depending on wheter the user selected a contact. 
            if (args.response === "selected") {
                var contact = args.data; //See data structure below
                // lets say you wanted to grab first name and last name
                // console.log(JSON.stringify(contact));
                if (contact.emailAddresses[0].value) {
                    _this.newContact = contact.emailAddresses[0].value;
                }
                else {
                    console.log('Pas d\'email associé à ce contact');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFHaEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFHdEQ7SUFJSTtJQUFnQixDQUFDO0lBRWpCLGlDQUFPLEdBQVA7UUFDSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSwyQ0FBMkMsQ0FBQzthQUNoSyxJQUFJLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFrQixHQUFsQjtRQUFBLGlCQW9CQztRQW5CRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUNwQyxpQkFBaUI7WUFDakIsaURBQWlEO1lBQ2pELDZGQUE2RjtZQUV6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQywwQkFBMEI7Z0JBRW5ELHVEQUF1RDtnQkFDdkQsd0NBQXdDO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO29CQUNqRCxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztnQkFDL0MsQ0FBQztZQUVMLENBQUM7UUFDRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFwQ1EsZUFBZTtRQUQzQixpQkFBVSxFQUFFOztPQUNBLGVBQWUsQ0FzQzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbnZhciBjb250YWN0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY29udGFjdHNcIik7XG5cbmRlY2xhcmUgdmFyIGFuZHJvaWQ6YW55O1xudmFyIHBlcm1pc3Npb25zID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbnRhY3RzU2VydmljZSB7XG5cbiAgICBuZXdDb250YWN0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcmVxUGVybSgpIHtcbiAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oYW5kcm9pZC5NYW5pZmVzdC5wZXJtaXNzaW9uLlJFQURfQ09OVEFDVFMsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5XUklURV9DT05UQUNUUywgXCJJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnMgYmVjYXVzZSBJJ20gY29vbFwiKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29vIEhvbywgSSBoYXZlIHRoZSBwb3dlciFcIik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVWggb2gsIG5vIHBlcm1pc3Npb25zIC0gcGxhbiBCIHRpbWUhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDb250YWN0VG9BZGQoKSB7XG4gICAgICAgIGNvbnRhY3RzLmdldENvbnRhY3QoKS50aGVuKChhcmdzKSA9PiB7XG4gICAgLy8vIFJldHVybnMgYXJnczpcbiAgICAvLy8gYXJncy5kYXRhOiBHZW5lcmljIGNyb3NzIHBsYXRmb3JtIEpTT04gb2JqZWN0XG4gICAgLy8vIGFyZ3MucmVwb25zZTogXCJzZWxlY3RlZFwiIG9yIFwiY2FuY2VsbGVkXCIgZGVwZW5kaW5nIG9uIHdoZXRlciB0aGUgdXNlciBzZWxlY3RlZCBhIGNvbnRhY3QuIFxuICAgICAgXG4gICAgICAgIGlmIChhcmdzLnJlc3BvbnNlID09PSBcInNlbGVjdGVkXCIpIHtcbiAgICAgICAgICAgIHZhciBjb250YWN0ID0gYXJncy5kYXRhOyAvL1NlZSBkYXRhIHN0cnVjdHVyZSBiZWxvd1xuICAgICAgICAgIFxuICAgICAgICAgICAgLy8gbGV0cyBzYXkgeW91IHdhbnRlZCB0byBncmFiIGZpcnN0IG5hbWUgYW5kIGxhc3QgbmFtZVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY29udGFjdCkpO1xuICAgICAgICAgICAgaWYgKGNvbnRhY3QuZW1haWxBZGRyZXNzZXNbMF0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0NvbnRhY3QgPSBjb250YWN0LmVtYWlsQWRkcmVzc2VzWzBdLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGFzIGRcXCdlbWFpbCBhc3NvY2nDqSDDoCBjZSBjb250YWN0Jyk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1BhcyBkXFwnZW1haWwgYXNzb2Npw6kgw6AgY2UgY29udGFjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=