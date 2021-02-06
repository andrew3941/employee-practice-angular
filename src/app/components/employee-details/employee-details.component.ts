import { Employee } from '../../models/employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from "@angular/forms";
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeId: number;
  employee: Employee;
  task: Task = new Task();

  constructor(
    private myRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }


  ngOnInit() {
    this.myRoute.paramMap.subscribe(params => {this.employeeId = +params.get('id');});
    this.getEmployeeById();
  }

  list(){
    this.router.navigate(['employees']);
  }

  getEmployeeById(){
    this.employeeService.getEmployeeById(this.employeeId)
      .subscribe(data => {

        console.log(data);

        this.employee = data;

        }, error => console.log(error));
  }


  onSubmitTask(form: NgForm){

    console.log(form);

  }


  saveNewTask(){
    console.log(this.task)
  }

  editTask(){

  }

  deleteTask(taskId){

    console.log(taskId);

    //Todo call a method to delete task by id
  }

}
