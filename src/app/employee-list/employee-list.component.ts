import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {Employee} from "../employee";
import {Observable} from "rxjs";

@Component({
  selector: 'app-employee-list',
  templateUrl:'./employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  private empoyee= new Employee();
  employ:Employee[];

  constructor(  private router: Router, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.dispayallemployee();
    // this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }




  // this is to navigate update
  goUpdate() {
    this.router.navigate(['/update/1']);
  }

  // details() {
  //   // this.router.navigate(['/details/1']);
  //   this.router.navigate(['details', id]);
  // }

  // deleteEmployee(id: number) {
  //   this.employeeService.deleteEmployee(id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.dispayallemployee();
  //       },
  //       error => console.log(error));
  // }

  // employeeDetails(id: number){
  //   this.router.navigate(['details', id]);
  // }
  dispayallemployee(){
    this.employeeService.getEmployeesList().subscribe(
      data => {
              console.log(data);
              this.employ=data;

            },
    )
  }

  // updateEmployee(id: number){
  //   this.router.navigate(['update', id]);
  // }


}
