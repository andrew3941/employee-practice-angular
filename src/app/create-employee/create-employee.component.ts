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
  query: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() { }

  onSubmitEmployee(employeeForm: NgForm) {
    console.log(employeeForm,"Message")
  }
}

