import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(  private router: Router) {

  }

  ngOnInit(): void {
  }

  // this is to navigate update
  goUpdate() {
    this.router.navigate(['/update/1']);
  }

  details() {
    this.router.navigate(['/details/1']);
  }

  deleteEmployee(id: number) {
    // this.employeeService.deleteEmployee(id)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.reloadData();
    //     },
    //     error => console.log(error));
  }

  employeeDetails(id: number){
    // this.router.navigate(['details', id]);
  }

  updateEmployee(id: number){
    // this.router.navigate(['update', id]);
  }

}
