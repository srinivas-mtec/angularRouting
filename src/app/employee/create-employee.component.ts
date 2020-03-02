import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService  } from '../SharedService/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  formErrors = {
    'firstName': '',
    'email': '',
    'skillName': '',
    'expInYrs': '',
    'proficiency': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 2 characters.',
    },
    'email': {
      'required': 'Email is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'expInYrs': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  constructor(private fb: FormBuilder, private empService:EmployeeService) { }

  ngOnInit() {
    /*
        this.employeeForm = new FormGroup({
          firstName: new FormControl(),
          email: new FormControl(),
          skills: new FormGroup({
            skillName: new FormControl(),
            expInYrs: new FormControl(),
            proficiency: new FormControl()
          })
        });
        */
    this.employeeForm = this.fb.group({
      firstName:new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', Validators.required),
      skills: this.fb.group({
        skillName: new FormControl(''),
        expInYrs: new FormControl(''),
        proficiency: new FormControl('beginer')
      })
    });

    this.employeeForm.valueChanges.subscribe(() => {
      this.logValidationErr(this.employeeForm);
    })
  }


  logValidationErr(formData: FormGroup = this.employeeForm): void {
    Object.keys(formData.controls).forEach((key: string) => {
      const abstractControl = formData.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErr(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const message = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + ' ';
            }


          }

        }
      }
    }
    )

  }



  onSubmit(): void {

    console.log(this.employeeForm.value);
     let emp:Employee = new Employee();
      emp.name = this.employeeForm.get('firstName').value;
     emp.email = this.employeeForm.get('email').value;
      emp.skillName = this.employeeForm.get('skills').get('skillName').value;
      emp.expInYears = this.employeeForm.get('skills').get('expInYrs').value;
      emp.proficiency = this.employeeForm.get('skills').get('proficiency').value;
      console.log("onSubmit :"+emp);
      this.empService.saveEmployeeDetails(emp).subscribe((data)=>
      {
        console.log("Data returned :"+data);
      },
      error =>{
        console.log("Error resp "+JSON.stringify(error));
      }
      )
    
  }

  onLoadData(): void {

    this.employeeForm.setValue({
      firstName: "srinivas",
      email: "srinivas.mtec@gmail.com",
      skills: {
        skillName: "Java",
        expInYrs: "14",
        proficiency: "intermediate"
      }

    });

  }

}
