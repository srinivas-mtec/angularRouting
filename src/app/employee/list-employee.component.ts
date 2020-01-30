import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {


  serviceList: Array<any> = [
    { name: 'ADSL', code: 'ADSL', selected: false },
    { name: 'Cable Broad Band', code: 'CBL', selected: false },
    { name: 'Foxtel TV', code: 'FOXTEL', selected: true },
    { name: 'Home Wireless', code: 'HWL', selected: true },
    { name: '4G Network', code: '4G', selected: false }
  ];
  packageForm:FormGroup;
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      serviceInfo: this.fb.group({
        deliveryDate: '',
        services: this.buildServiceList()
      })
  
    });
  }

  buildServiceList() {
    const arr = this.serviceList.map(service => {
      return this.fb.control(service.selected);
    });
    return this.fb.array(arr);
  }
}
