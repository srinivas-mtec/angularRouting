import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  skills: FormGroup;
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

  constructor(private fb: FormBuilder) { }

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
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: [''],
        expInYrs: [''],
        proficiency: ['beginer']
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

    console.log(this.employeeForm.get('skills.skillName').value);
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
