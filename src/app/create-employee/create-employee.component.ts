import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  saveEmployeeSpinner: boolean;
  employeeSpinner: boolean;
  validemployee: boolean;
  employee: Employee = new Employee();
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-secondary ml-4'
    },
    buttonsStyling: false
  });


  constructor(private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {

  }

  // this method validate Query
  validateQuery(form: NgForm): boolean {
    this.validemployee = true;
    const email = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    // check for the worker
    if (this.employee.firstName === null || this.employee.firstName === ''
      || this.employee.firstName === undefined) {
      form.controls.firstName.setErrors({emptyField: true});
      this.validemployee = false;
    } else if (this.employee.firstName.length > 150) {
      form.controls.firstName.setErrors({maxlength: true});
      this.validemployee = false;
    }

    if (this.employee.lastName === null || this.employee.lastName === ''
      || this.employee.lastName === undefined) {
      form.controls.lastname.setErrors({emptyField: true});
      this.validemployee = false;
    } else if (this.employee.lastName.length > 150) {
      form.controls.lastname.setErrors({maxlength: true});
      this.validemployee = false;
    }

    if (this.employee.email === null || this.employee.email === ''
      || this.employee.email === undefined) {
      form.controls.email.setErrors({emptyField: true});
      this.validemployee = false;
    } else if (this.employee.email.length >80) {
      form.controls.email.setErrors({maxlength: true});
      this.validemployee = false;
    } else if (!email.test(this.employee.email)) {
      form.controls.email.setErrors({pattern: true});
      this.validemployee = false;
    }

    if (this.employee.phoneNumber === null || this.employee.phoneNumber === undefined) {
      form.controls.phoneNumber.setErrors({emptyField: true});
      this.validemployee = false;
    }

    if (this.employee.address === null || this.employee.address === ''
      || this.employee.address === undefined) {
      form.controls.address.setErrors({emptyField: true});
      this.validemployee = false;
    } else if (this.employee.address.length > 150) {
      form.controls.address.setErrors({maxlength: true});
      this.validemployee = false;
    }

    if (this.employee.department === null || this.employee.department === ''
      || this.employee.department === undefined) {
      form.controls.department.setErrors({emptyField: true});
      this.validemployee = false;
    } else if (this.employee.department.length >100) {
      form.controls.department.setErrors({maxlength: true});
      this.validemployee = false;
    }

    if (this.employee.gender === null || this.employee.gender === undefined) {
      form.controls.gender.setErrors({emptyField: true});
      this.validemployee = false;
    }
    return this.validemployee;
  }


  onSubmitEmployee(employeeForm: NgForm) {
    this.validateQuery(employeeForm);
    this.employeeService.createEmployee(this.employee)
      .subscribe((data) => {
        if (data == 500){
          this.employeeSpinner = false;
        } else {
          this.swalWithBootstrapButtons.fire(
            'Guardado!',

            'success');
          this.employeeSpinner = false;
          this.ngOnInit();
        }
      }, error1 => {
        console.log("submited",employeeForm);
        this.swalWithBootstrapButtons.fire(
          'Error!',
          'error');
        this.employeeSpinner = false;
      });
  }

  // this method reset New Query model
  resetemployeeForm() {
    this.employee.firstName = null;
    this.employee.lastName = null;
    this.employee.gender = null;
    this.employee.phoneNumber = null;
    this.employee.address = null;
    this.employee.email = null;
    this.employee.department = null;
  }
}

