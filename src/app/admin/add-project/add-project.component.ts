import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { Project } from '../../project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  userModel;
  projectModel = new Project;
  employees = [];

  constructor(private router: Router, private user: UserService) { }

  async ngOnInit() {
    try {
      const employees = await this.getEmployee()
      if (employees != undefined || employees != null) {
        this.userModel = employees
      }
    } catch (error) {
      return error
    }
  }

  getEmployee() {
    this.user.employee()
      .subscribe(res => {
        console.log(res)
        this.userModel = res
      },
        (error) => {
          console.log(error)
        }
      )
  }
  onFormSubmit() {
    this.user.addProject(this.projectModel, this.employees)
      .subscribe(res => {
        this.router.navigate(["/projects"])
      }, (error) => {
        console.error(error)
      })
  }

  cancelAdd() {
    this.router.navigate(["/projects"])
  }

  add_employee(id) {
    this.employees.push(id)
  }

  remove(employee) {
    var index = this.employees.indexOf(employee);
    if (index > -1) {
      this.employees.splice(index, 1);
    }
  }

}
