import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Tasks } from "../../tasks";

@Component({
  selector: 'app-generate-task',
  templateUrl: './generate-task.component.html',
  styleUrls: ['./generate-task.component.css']
})
export class GenerateTaskComponent implements OnInit {

  projectsModel;
  tasksModel = new Tasks();
  employees = [];
  projects = [];
  userModel;
  edit: Boolean = false

  constructor(private router: Router, private user: UserService) { }

  async ngOnInit() {
    try {
      const projects = await this.getProjects()
      const employeeProfile = await this.getProfile()

      if(projects != undefined || projects != null){
        this.projectsModel = projects
        this.userModel = employeeProfile
      }
    } catch (error) {
      
    }
  }

  getProfile(){
    this.user.employeeProfile()
      .subscribe(res => {
        this.userModel = res[0]
      }, error => {
        console.error(error)
      })
  }

  getProjects(){
    this.user.projects()
      .subscribe(res => {
        this.projectsModel = res
      }, (error) => {
        console.error(error)
      })
  }

  onFormSubmit(){
    this.user.createTask(this.tasksModel, this.projects, this.userModel.employee_id)
      .subscribe(res => {
        this.router.navigate(["/myTasks"])
      }, (error) => {
        console.error(error)
      })
  }

  cancelAdd() {
    this.router.navigate(["/individualTask"])
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
