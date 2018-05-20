"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./pages/login/login.component");
var list_component_1 = require("./pages/list/list.component");
var list_single_component_1 = require("./pages/list/list-single/list-single.component");
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "list", component: list_component_1.ListComponent },
    { path: "list/view/:id", component: list_single_component_1.ListSingleComponent },
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    list_component_1.ListComponent,
    list_single_component_1.ListSingleComponent,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUErRDtBQUMvRCw4REFBNEQ7QUFFNUQsd0ZBQXFGO0FBRXhFLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUN2QyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUU7SUFDMUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSwyQ0FBbUIsRUFBQztDQUN6RCxDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FBRztJQUNuQyxnQ0FBYztJQUNkLDhCQUFhO0lBQ2IsMkNBQW1CO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2xpc3QvbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlzdFNpbmdsZUNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvbGlzdC9saXN0LXNpbmdsZS9saXN0LXNpbmdsZS5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcbiAgeyBwYXRoOiBcImxpc3RcIiwgY29tcG9uZW50OiBMaXN0Q29tcG9uZW50IH0sXG4gIHsgcGF0aDogXCJsaXN0L3ZpZXcvOmlkXCIsIGNvbXBvbmVudDogTGlzdFNpbmdsZUNvbXBvbmVudH0sXG5dO1xuXG5leHBvcnQgY29uc3QgbmF2aWdhdGFibGVDb21wb25lbnRzID0gW1xuICBMb2dpbkNvbXBvbmVudCxcbiAgTGlzdENvbXBvbmVudCxcbiAgTGlzdFNpbmdsZUNvbXBvbmVudCxcbl07XG4iXX0=