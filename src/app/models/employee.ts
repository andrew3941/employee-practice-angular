import {Task} from './task';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  department: string;
  phoneNumber: number;
  email: string;
  tasks: Task[] = new Array <Task> ();
  createdDate: Date = new Date();
  modifyDate: Date = new Date();


}
