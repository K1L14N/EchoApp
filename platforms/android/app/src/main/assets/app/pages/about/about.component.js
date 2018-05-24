"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
        this.text = "L'application Echo a été codée en 2018 par Kilian Low, Adrien Piet et Briac Belin.";
        this.textPrincipe = "Cette application sert à communiquer avec les contacts de son téléphone : toutes celles et ceux situé(e)s dans un rayon défini et ayant un compte sur notre application recevront le message envoyé.Ce message peut être textuel, vocal, vidéo ou bien une photo.\n\nLibre à vous maintenant de découvrir les nombreuses possibilités offertes !";
        this.textReglementation = "Conformément au réglement européen sur la protection des données entré en vigueur en mai 2018, la société détentrice des droits de l'application Echo s'engage à certifier à ses utilisateurs qu'elle n'utilisera pas les données recoltées ni ne s'intéressera aux messages envoyés de par le monde. \n\nVotre vie privée, c'est notre priorité !";
    }
    AboutComponent.prototype.ngOnInit = function () { };
    AboutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'about',
            templateUrl: './about.component.html',
            styleUrls: ['./about.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBUWpEO0lBTUk7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLG9GQUFvRixDQUFDO1FBQ2pHLElBQUksQ0FBQyxZQUFZLEdBQUcsa1ZBQWtWLENBQUM7UUFDdlcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLG9WQUFvVixDQUFDO0lBQ2xYLENBQUM7SUFFRixpQ0FBUSxHQUFSLGNBQVksQ0FBQztJQVpKLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsT0FBTztZQUNqQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3ZDLENBQUM7O09BRVcsY0FBYyxDQWExQjtJQUFELHFCQUFDO0NBQUEsQUFiRCxJQWFDO0FBYlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnYWJvdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hYm91dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWJvdXQuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQWJvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGV4dDogU3RyaW5nO1xuICAgIHRleHRQcmluY2lwZTogU3RyaW5nO1xuICAgIHRleHRSZWdsZW1lbnRhdGlvbjogU3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudGV4dCA9IFwiTCdhcHBsaWNhdGlvbiBFY2hvIGEgw6l0w6kgY29kw6llIGVuIDIwMTggcGFyIEtpbGlhbiBMb3csIEFkcmllbiBQaWV0IGV0IEJyaWFjIEJlbGluLlwiO1xuICAgICAgICB0aGlzLnRleHRQcmluY2lwZSA9IFwiQ2V0dGUgYXBwbGljYXRpb24gc2VydCDDoCBjb21tdW5pcXVlciBhdmVjIGxlcyBjb250YWN0cyBkZSBzb24gdMOpbMOpcGhvbmUgOiB0b3V0ZXMgY2VsbGVzIGV0IGNldXggc2l0dcOpKGUpcyBkYW5zIHVuIHJheW9uIGTDqWZpbmkgZXQgYXlhbnQgdW4gY29tcHRlIHN1ciBub3RyZSBhcHBsaWNhdGlvbiByZWNldnJvbnQgbGUgbWVzc2FnZSBlbnZvecOpLkNlIG1lc3NhZ2UgcGV1dCDDqnRyZSB0ZXh0dWVsLCB2b2NhbCwgdmlkw6lvIG91IGJpZW4gdW5lIHBob3RvLlxcblxcbkxpYnJlIMOgIHZvdXMgbWFpbnRlbmFudCBkZSBkw6ljb3V2cmlyIGxlcyBub21icmV1c2VzIHBvc3NpYmlsaXTDqXMgb2ZmZXJ0ZXMgIVwiO1xuICAgICAgICB0aGlzLnRleHRSZWdsZW1lbnRhdGlvbiA9IFwiQ29uZm9ybcOpbWVudCBhdSByw6lnbGVtZW50IGV1cm9ww6llbiBzdXIgbGEgcHJvdGVjdGlvbiBkZXMgZG9ubsOpZXMgZW50csOpIGVuIHZpZ3VldXIgZW4gbWFpIDIwMTgsIGxhIHNvY2nDqXTDqSBkw6l0ZW50cmljZSBkZXMgZHJvaXRzIGRlIGwnYXBwbGljYXRpb24gRWNobyBzJ2VuZ2FnZSDDoCBjZXJ0aWZpZXIgw6Agc2VzIHV0aWxpc2F0ZXVycyBxdSdlbGxlIG4ndXRpbGlzZXJhIHBhcyBsZXMgZG9ubsOpZXMgcmVjb2x0w6llcyBuaSBuZSBzJ2ludMOpcmVzc2VyYSBhdXggbWVzc2FnZXMgZW52b3nDqXMgZGUgcGFyIGxlIG1vbmRlLiBcXG5cXG5Wb3RyZSB2aWUgcHJpdsOpZSwgYydlc3Qgbm90cmUgcHJpb3JpdMOpICFcIjtcbiAgICAgfVxuXG4gICAgbmdPbkluaXQoKSB7fVxufVxuIl19