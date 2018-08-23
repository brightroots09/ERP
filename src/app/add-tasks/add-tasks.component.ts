import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Tasks } from "../tasks";

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  projectsModel;
  tasksModel = new Tasks()
  projects = []

  constructor(private router: Router, private user: UserService) { }

  async ngOnInit() {
    try {
      const projects = await this.getProjects()
      if(projects != undefined || projects != null){
        this.projectsModel = projects
      }
    } catch (error) {
      
    }
  }
  getProjects(){
    this.user.projects()
      .subscribe(res => {
        console.log("======>", res)
        this.projectsModel = res
      }, (error) => {
        console.error(error)
      })
  }

  onFormSubmit(){
    this.user.createTasks(this.tasksModel, this.projects)
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
  }

  remove(project) {
    var index = this.projects.indexOf(project);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

}
