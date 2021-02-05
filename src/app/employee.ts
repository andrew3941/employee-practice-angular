import {Tasks} from "./tasks";

export class Employee {
  id: number;
  tasks: Tasks = new Tasks();
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  department: string;
  phoneNumber: Number;
  email: string;
  createdDate:Date;
  modifyDate:Date;


}
