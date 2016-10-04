import { Component, ViewChild } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app',
  styles:[`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
    `],
  template: `
<form
  #formRef="ngForm"
  (ngSubmit)="onSubmit(formRef.value)"
  >
    <fieldset ngModelGroup="login">
      <input
        name="username"
        type="text"
        [(ngModel)]="username"
        #usernameRef = "ngModel"
        required
        minlength="3"
      >
      <div *ngIf="usernameRef.errors?.required">This field is required</div>
      <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {{usernameRef.errors?.minlength.requiredLength}} characters. You only typed {{usernameRef.errors?.minlength.actualLength}}.</div>

      <input type="password" ngModel name="password">
    </fieldset>
    <hr>
    <div *ngFor="let location of locations">
      <input
        [attr.id]="location"
        name="location"
        ngModel
        [value]="location"
        type="radio"
      >
      <label [attr.for]="location">{{location}}</label>
    </div>
    <hr>
    <select name="country" [ngModel]="countries[0]">
      <option
        *ngFor="let country of countries"
        [value]="country">
        {{country}}
      </option>
    </select>
    <hr>
    <button type="submit">Submit</button>

</form>
{{formRef.value | json}}
{{formRef.valid | json}}
  `
})
export class AppComponent {
  @ViewChild('formRef') form;

  username = "Airton";

  locations = ["Home", "Work", "Space", "Air", "Sea"];

  countries = ["Brazil", "Israel", "EUA", "Australia", "France", "Denmark"];

  onSubmit(formValue){
    console.log(formValue);
  }

  //using RxJS to view status on table console
  ngAfterViewInit(){
    Observable.combineLatest(
      this.form.statusChanges,
      this.form.valueChanges,
      (status, value)=> ({status, value})
    )
      .filter(({status})=> status === 'VALID')
      .subscribe(({value})=> console.table(value))
  }
}
