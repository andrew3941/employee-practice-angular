import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:2021/employees';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // This method save and Create the employee
  saveEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + '/save', employee);
  }
  // This method update the employee
  // updateEmployee(id: number, value: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}+``+/${id}`, value);
  // }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // http://localhost:2021/employee/all
  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/all');
  }
  // Method to get Activity
  // getpid(pid: number): Observable<any> {
  //   const url = `${this.baseUrl()}` + '/sajp-activities.do?action=activity&activityId=' + `${activityId}` + '&customerId=' + `${customerId}` ;
  //   return this.http.get<any>(url);
  // }



}
