
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  validEmployee: boolean;
  emloyeeSpinner: boolean;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-secondary ml-4'
    },
    buttonsStyling: false
  });
  submitted = false;

  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit() {
  }

  resetEmployee() {
    this.employee.firstName = null;
    this.employee.lastName = null;
    this.employee.address = null;
    this.employee.active = null;
    this.employee.gender = null;
    this.employee.department = null;
    this.employee.emailId = null;
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService
      .createEmployee(this.employee).subscribe(data => {
        console.log(data);
        this.employee = new Employee();
        this.gotoList();
      },
      error => console.log(error));
  }

// this method validate the Employee
  validateQuery(form: NgForm): boolean {
    this.validEmployee = true;
    const phone = new RegExp('^[9|8|7|6]?[0-9]{9}$');
    const emailId = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    // check for the worker
    if (this.employee.firstName === null || this.employee.firstName === ''
      || this.employee.firstName === undefined) {
      form.controls.firstName.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.firstName.length > 50) {
      form.controls.firstName.setErrors({maxlength: true});
      this.validEmployee = false;
    }

    if (this.employee.lastName === null || this.employee.lastName === ''
      || this.employee.lastName === undefined) {
      form.controls.lastName.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.lastName.length > 50) {
      form.controls.lastName.setErrors({maxlength: true});
      this.validEmployee = false;
    }

    if (this.employee.emailId === null || this.employee.emailId === ''
      || this.employee.emailId === undefined) {
      form.controls.emailId.setErrors({emptyField: true});
      this.validEmployee = false;
    }
    else if (this.employee.emailId.length > 80) {
      form.controls.emailId.setErrors({maxlength: true});
      this.validEmployee = false;
    } else if (!emailId.test(this.employee.emailId)) {
      form.controls.emailId.setErrors({pattern: true});
      this.validEmployee = false;
    }

    if (this.employee.phone === null || this.employee.phone === undefined) {
      form.controls.phone.setErrors({emptyField: true});
      this.validEmployee = false;
    }

    if (this.employee.department === null || this.employee.department === ''
      || this.employee.department === undefined) {
      form.controls.department.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.department.length > 150) {
      form.controls.department.setErrors({maxlength: true});
      this.validEmployee = false;
    }

    if (this.employee.gender === null || this.employee.gender === ''
      || this.employee.gender === undefined) {
      form.controls.gender.setErrors({emptyField: true});
      this.validEmployee = false;
    }

    if (this.employee.address === null || this.employee.address === undefined) {
      form.controls.address.setErrors({emptyField: true});
      this.validEmployee = false;
    }
    return this.validEmployee;
  }


  onSubmitEmployee(employeeForm: NgForm) {
    this.submitted = true;
    this.validateQuery(employeeForm);
    if (this.validEmployee) {
      this.swalWithBootstrapButtons.fire({
        title: 'Do you Save',
        text: 'Save Employee',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.emloyeeSpinner = true;
        }
      });
    }
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
