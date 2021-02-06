import {Employee} from "./employee";

export class Task {
  id: number;
  employee: Employee = new Employee();
  title: string;
  description: string;
  status: number;
  createdDate: Date = new Date();
  modifyDate: Date = new Date();

}
