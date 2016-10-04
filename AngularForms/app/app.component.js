"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/combineLatest');
require('rxjs/add/operator/filter');
var AppComponent = (function () {
    function AppComponent() {
        this.username = "Airton";
        this.locations = ["Home", "Work", "Space", "Air", "Sea"];
        this.countries = ["Brazil", "Israel", "EUA", "Australia", "France", "Denmark"];
    }
    AppComponent.prototype.onSubmit = function (formValue) {
        console.log(formValue);
    };
    //using RxJS to view status on table console
    AppComponent.prototype.ngAfterViewInit = function () {
        Observable_1.Observable.combineLatest(this.form.statusChanges, this.form.valueChanges, function (status, value) { return ({ status: status, value: value }); })
            .filter(function (_a) {
            var status = _a.status;
            return status === 'VALID';
        })
            .subscribe(function (_a) {
            var value = _a.value;
            return console.table(value);
        });
    };
    __decorate([
        core_1.ViewChild('formRef'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "form", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            styles: ["\n    input.ng-invalid{\n      border: 3px solid red;\n    }\n    input.ng-valid{\n      border: 3px solid green;\n    }\n    "],
            template: "\n<form\n  #formRef=\"ngForm\"\n  (ngSubmit)=\"onSubmit(formRef.value)\"\n  >\n    <fieldset ngModelGroup=\"login\">\n      <input\n        name=\"username\"\n        type=\"text\"\n        [(ngModel)]=\"username\"\n        #usernameRef = \"ngModel\"\n        required\n        minlength=\"3\"\n      >\n      <div *ngIf=\"usernameRef.errors?.required\">This field is required</div>\n      <div *ngIf=\"usernameRef.errors?.minlength\">This field must be longer than {{usernameRef.errors?.minlength.requiredLength}} characters. You only typed {{usernameRef.errors?.minlength.actualLength}}.</div>\n\n      <input type=\"password\" ngModel name=\"password\">\n    </fieldset>\n    <hr>\n    <div *ngFor=\"let location of locations\">\n      <input\n        [attr.id]=\"location\"\n        name=\"location\"\n        ngModel\n        [value]=\"location\"\n        type=\"radio\"\n      >\n      <label [attr.for]=\"location\">{{location}}</label>\n    </div>\n    <hr>\n    <select name=\"country\" [ngModel]=\"countries[0]\">\n      <option\n        *ngFor=\"let country of countries\"\n        [value]=\"country\">\n        {{country}}\n      </option>\n    </select>\n    <hr>\n    <button type=\"submit\">Submit</button>\n\n</form>\n{{formRef.value | json}}\n{{formRef.valid | json}}\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map