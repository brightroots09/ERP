import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Tasks } from "../../tasks";

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  projectsModel;
  tasksModel = new Tasks();
  employees = [];
  projects = [];
  userModel;
  edit: Boolean = false

  constructor(private router: Router, private user: UserService) { }

  async ngOnInit() {
    try {
      await this.getProjects()
      await this.getEmployee()
    } catch (error) {
      
    }
  }

  getProjects(){
    this.user.projects()
      .subscribe(res => {
        this.projectsModel = res
      }, (error) => {
        console.error(error)
      })
  }

  getEmployee() {
    this.user.employee()
      .subscribe(res => {
        this.userModel = res
      },
        (error) => {
          console.log(error)
        }
      )
  }

  add_employee(id) {
    this.employees.push(id)
    this.employees.forEach((item, index) => {
      if (index !== this.employees.findIndex(i => i === item)) {
        this.employees.splice(index, 1);
      }
    });
  }

  removeEmployee(employee) {
    var index = this.employees.indexOf(employee);
    if (index > -1) {
      this.employees.splice(index, 1);
    }
  }

  onFormSubmit(){
    this.user.createTasks(this.tasksModel, this.projects, this.employees)
      .subscribe(res => {
        this.router.navigate(["/tasks"])
      }, (error) => {
        console.error(error)
      })
  }

  cancelAdd() {
    this.router.navigate(["/tasks"])
  }

  add_project(project) {
    this.projects.push(project)
    this.projects.forEach((item, index) => {
      if (index !== this.projects.findIndex(i => i === item)) {
        this.projects.splice(index, 1);
      }
    });
  }

  remove(project) {
    var index = this.projects.indexOf(project);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

  otherType(){
    this.edit = !this.edit
  }

}
