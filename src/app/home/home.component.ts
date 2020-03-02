import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms'
import {environment } from "../../environments/environment"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usrl : string = environment.baseUrll;

  student : FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    /* this.student = this.fb.group({
      name : new FormControl(''),
      address : this.fb.group({
        address1 : new FormControl(''),
        postCode :  new FormControl('')
      })


     });
     */
    this.student = this.fb.group({
      name : [''],
      address : this.fb.group({
        address1 : [''],
        postCode :   [''],
      })
  });
}

  submitForm() : void {
    console.log(this.student.value);
  }

  

}
