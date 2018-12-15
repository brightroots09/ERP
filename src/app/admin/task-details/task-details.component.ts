import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  tasksModel = [];
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
      await this.getTasksDetails()
    } catch (error) {
      return error
    }
  }


  getTasksDetails(){
    this.user.tasksDetails(this.param.id)
      .subscribe(res => {
        for(let task in res) {
          let now_date = new Date()
          let in_time;
          let created_date = moment(res[task].task_date_created, 'YYYY-MM-DD HH:mm:ss')
          if(res[task].updated_date != null){
            in_time = moment(res[task].updated_date, 'YYYY-MM-DD HH:mm:ss')
          }
          else {
            in_time = moment(res[task].task_date_created, 'YYYY-MM-DD HH:mm:ss')
          }
          let new_date = moment(now_date, 'YYYY-MM-DD HH:mm:ss')
          let diff = moment.duration(new_date.diff(created_date))
          let format_date = diff.asHours();
          res[task].total_hours = format_date;
          res[task].task_date_created = in_time.format('ll');
          if(in_time.date() == new_date.date() && in_time.month() == new_date.month() || res[task].status == 'completed'){
            this.tasksModel.push(res[task])
          }
          else {
            res[task].status = "expired"
            this.tasksModel.push(res[task])
          }
        }
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
