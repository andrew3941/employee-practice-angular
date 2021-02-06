import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl =  environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployeeById(employeeId: number): Observable<any> {
    return this.http.get<any>( this.baseUrl + '/employees/' + `${employeeId}`);
  }

  // This method save and Create the employee
  saveNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>( this.baseUrl + '/employees/save', employee);
  }
  // This method update the employee
  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>( this.baseUrl + '/employees/' +`${employeeId}` +'/edit', employee);
  }

  deleteEmployeeById(id: number): Observable<any> {
    const url = this.baseUrl + '/employees/' +`${id}`+ '/delete';
    return this.http.post(url, null);
  }
  getEmployeesList(): Observable<any> {
    return this.http.get(this.baseUrl+'/employees/all');
  }

}
