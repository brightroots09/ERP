import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  tasksModel;
  projectModel = [];
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
    this.user.tasksDetails(this.param.id)
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

  onFormSubmit(){
    this.edit = false
    this.user.editTask(this.param.id, this.tasksModel)
      .subscribe(res => {
        this.router.navigate([`/tasks_details/${this.param.id}`])
      },
    (error) => {
      console.error(error)
    })
  }

  goBack(){
    this.router.navigate(["/tasks"])
  }

  deleteTask(){
    this.user.deleteTask(this.param.id)
      .subscribe(res => {
        this.router.navigate(["/tasks"])
      }, (error) => {
        console.error(error)
      })
  }

}
