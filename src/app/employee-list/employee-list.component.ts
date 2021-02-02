import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {Employee} from "../employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  private empoyee= new Employee();
  employ:Employee[];

  constructor(  private router: Router, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.dispayallemployee();
  }

  // this is to navigate update
  goUpdate() {
    this.router.navigate(['/update/1']);
  }

  details() {
    this.router.navigate(['/details/1']);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.dispayallemployee();
        },
        error => console.log(error));
  }

  employeeDetails(id: number){
    // this.router.navigate(['details', id]);
  }
  dispayallemployee(){
    this.employeeService.getEmployeesList().subscribe(
      data => {
              console.log(data);
              this.employ=data;

            },
    )

  }

  updateEmployee(id: number){
    // this.router.navigate(['update', id]);
  }


}
