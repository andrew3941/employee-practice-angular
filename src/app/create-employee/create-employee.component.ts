
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeSpinner: boolean;
  employee: Employee = new Employee();
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

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
