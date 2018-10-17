import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-project-task-details',
  templateUrl: './project-task-details.component.html',
  styleUrls: ['./project-task-details.component.css']
})
export class ProjectTaskDetailsComponent implements OnInit {

  tasksModel;
  param;
  filtersLoaded: Promise<boolean>;

  private edit: boolean = false;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => {
      this.param = params 
    });
  }

  async ngOnInit() {
    try {
      const details = await this.getTasksDetails()
      if(details != undefined || details != null){
        this.tasksModel = details
      }
    } catch (error) {
      return error
    }
  }

  getTasksDetails(){
    this.user.projectTasksDetails(this.param.id)
      .subscribe(res => {
        this.tasksModel = res
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  toggleEdit(){
    this.edit = true
  }

  cancelUpdate(){
    this.edit = false;
  }

  onFormSubmit(id){
    this.edit = false
    this.user.editProjectTask(id, this.tasksModel)
      .subscribe(res => {
        this.router.navigate([`/tasks_details/${id}`])
      },
    (error) => {
      console.error(error)
    })
  }

  goBack(){
    this.router.navigate([`/project_details/${this.param.id}`])
  }

  deleteTask(id){
    this.user.deleteTask(id)
      .subscribe(res => {
        this.router.navigate(["/tasks"])
      }, (error) => {
        console.error(error)
      })
  }
}
