import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  form: FormGroup;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        emailId: [null, [Validators.required, Validators.email]],
        address: this.formBuilder.group({
          gender: [null, Validators.required],
          department:[null, Validators.required],
      })
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.employee);
    if (this.form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  reset(){
    this.form.reset();
  }
}
