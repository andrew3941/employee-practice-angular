import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  saveEmployeeSpinner: boolean;
  employeeSpinner: boolean;
  editMode:boolean;

  isClosed: boolean;

  validEmployee: boolean;
  employee: Employee = new Employee();
  employees: Employee[] = new Array<Employee>();

  employeeId: number;
  deletingEmployeeFileId: number;

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-secondary ml-4'
    },
    buttonsStyling: false
  });


  constructor(private employeeService: EmployeeService,
              private router: Router,
              private myRoute: ActivatedRoute
              ) { }

  ngOnInit() {
    this.getAllemployees();
    this.myRoute.paramMap.subscribe(params => {this.employeeId = +params.get('id');});
  }

  // this method validate employee
  validateEmployee(form: NgForm): boolean {
    this.validEmployee = true;
    const phoneNumber = new RegExp('^[9|8|7|6]?[0-9]{9}$');
    const email = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    // check for the FirstName
    if (this.employee.firstName === null || this.employee.firstName === ''
      || this.employee.firstName === undefined) {
      form.controls.firstName.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.firstName.length > 50) {
      form.controls.firstName.setErrors({maxlength: true});
      this.validEmployee = false;
    }
   // check for the LastName
    if (this.employee.lastName === null || this.employee.lastName === ''
      || this.employee.lastName === undefined) {
      form.controls.lastName.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.lastName.length > 50) {
      form.controls.lastName.setErrors({maxlength: true});
      this.validEmployee = false;
    }
    // check for the email
    if (this.employee.email === null || this.employee.email === ''
      || this.employee.email === undefined) {
      form.controls.email.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.email.length >80) {
      form.controls.email.setErrors({maxlength: true});
      this.validEmployee = false;
    } else if (!email.test(this.employee.email)) {
      form.controls.email.setErrors({pattern: true});
      this.validEmployee = false;
    }
    // check for the address
    if (this.employee.address === null || this.employee.address === ''
      || this.employee.address === undefined) {
      form.controls.address.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.address.length > 150) {
      form.controls.address.setErrors({maxlength: true});
      this.validEmployee = false;
    }
    // check for the gender
    if (this.employee.gender === null || this.employee.gender === undefined) {
      form.controls.gender.setErrors({emptyField: true});
      this.validEmployee = false;
    }
    // check for the department
    if (this.employee.department === null || this.employee.department === ''
      || this.employee.department === undefined) {
      form.controls.department.setErrors({emptyField: true});
      this.validEmployee = false;
    } else if (this.employee.department.length >100) {
      form.controls.department.setErrors({maxlength: true});
      this.validEmployee = false;
    }
    // check for the phoneNumber
    if(this.employee.phoneNumber === null || this.employee.phoneNumber === undefined) {
      form.controls.phoneNumber.setErrors({emptyField: true});
      this.validEmployee = false;
    }
    if (!phoneNumber.test(String(this.employee.phoneNumber))) {
      form.controls.phoneNumber.setErrors({pattern: true});
      this.validEmployee = false;
    }
    return this.validEmployee;
  }


  onSubmitEmployee(employeeForm: NgForm) {

    this.validateEmployee(employeeForm);

    if (this.validEmployee) {

      if( this.employeeId < 1){
        this.editMode = false;
        this.saveNewEmployee(this.employee);
      } else {
        this.editMode = true;
        this.updateEmployee(this.employeeId, this.employee);
      }

    }
  }


  // this method reset New Query model
  resetemployeeForm() {
    this.employee.firstName = null;
    this.employee.lastName = null;
    this.employee.gender = null;
    this.employee.phoneNumber = null;
    this.employee.address = null;
    this.employee.email = null;
    this.employee.department = null;
  }

  saveNewEmployee(employee:Employee){

    this.swalWithBootstrapButtons.fire({
      title: 'Save employee',
      text: 'Do you want to Save the employee',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then(data => {
      this.saveEmployeeSpinner = true;

      console.log(this.employee);

      this.employeeService.saveNewEmployee(employee)
        .subscribe(data=> {

          if (data){
            this.swalWithBootstrapButtons.fire(
              'Guardado!',
              'success');
            this.saveEmployeeSpinner = false;

            // $('#saveEmployee').modal('toggle');
            //TODO close the modal
            this.ngOnInit();
          }
        }, error1 => {
          this.swalWithBootstrapButtons.fire(
            'Guardado!',
            'success');
          this.saveEmployeeSpinner = false;
        });
    });

  }

  updateEmployee(employeeId: number, employee: Employee){

    this.swalWithBootstrapButtons.fire({
      title: 'Save employee',
      text: 'Do you want to Save the employee',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then(data => {
      this.saveEmployeeSpinner = true;

      console.log(this.employee);

      this.employeeService.updateEmployee( employeeId, employee)
        .subscribe(data=> {

          if (data){
            this.swalWithBootstrapButtons.fire(
              'Guardado!',
              'success');
            this.saveEmployeeSpinner = false;

            //TODO close the modal

            this.ngOnInit();
          }
        }, error1 => {
          this.swalWithBootstrapButtons.fire(
            'Guardado!',
            'error');
          this.saveEmployeeSpinner = false;
        });
    });
  }

  deleteEmployee(id: number) {

    //TODO Show confirmation before delete employee

    this.employeeService.deleteEmployeeById(id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }

  getAllemployees(){
    this.employeeService.getEmployeesList()
      .subscribe(
        data=> {
          console.log(data);
          this.employees = data
        }
      );
  }



  // this method delete a document with confirmation
  deleteEmployeeById(id: number) {

    this.swalWithBootstrapButtons.fire({
      title: 'Delete employee',
      text: 'Do you want to delete the employee',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deletingEmployeeFileId = id;
        this.employeeService.deleteEmployeeById(id)
          .subscribe(data => {
            this.swalWithBootstrapButtons.fire(
              'Guardado!',
              'Se ha guardado el documento.',
              'success'
            );
            this.deletingEmployeeFileId = null;

            this.ngOnInit();
          }, error1 => {

            this.swalWithBootstrapButtons.fire(
              'Error!',
              'No se pudo borrar el documento.',
              'error'
            );
            this.deletingEmployeeFileId = null;
          });
      }
    });
  }



}

