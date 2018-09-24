import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Tasks } from "../../tasks";

@Component({
  selector: 'app-add-project-task',
  templateUrl: './add-project-task.component.html',
  styleUrls: ['./add-project-task.component.css']
})
export class AddProjectTaskComponent implements OnInit {

  projectsModel;
  tasksModel = new Tasks();
  employees = [];
  projects = [];
  userModel;
  edit: Boolean = false;
  param;
  filtersLoaded: Promise<boolean>;
  message;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.param = params
    });

  }

  async ngOnInit() {
    try {
      // const projects = await this.getProjects()
      const employee = await this.getEmployee()
      // if(projects != undefined || projects != null){
        // this.projectsModel = projects
        this.userModel = employee
      // }
    } catch (error) {
      
    }
  }

  // getProjects(){
  //   this.user.projects()
  //     .subscribe(res => {
  //       console.log("======>", res)
  //       this.projectsModel = res
  //     }, (error) => {
  //       console.error(error)
  //     })
  // }

  getEmployee() {
    this.user.employee()
      .subscribe(res => {
        console.log(res)
        this.userModel = res
        this.filtersLoaded = Promise.resolve(true);
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
    if(this.employees.length > 0){
      this.user.createProjectTask(this.param.id, this.tasksModel, this.employees)
      .subscribe(res => {
        this.router.navigate([`/projectTasksDetails/${this.param.id}`])
      }, (error) => {
        console.error(error)
      })
    }
    else{
      this.message = "You need to select atleast one employee"
    }
  }

  cancelAdd() {
    this.router.navigate([`/projectTasksDetails/${this.param.id}`])
  }
}
