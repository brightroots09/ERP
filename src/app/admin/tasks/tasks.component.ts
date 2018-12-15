import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { staggerAnimate } from '../../animation';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    staggerAnimate    
  ]
})
export class TasksComponent implements OnInit {

  tasksModel = [];
  param;
  filtersLoaded: Promise<boolean>
  deleteTasksArr = [];
  checkboxValue: boolean;

  removeArr = [];

  private multiSelect: boolean = false;

  constructor(private router: Router, private user: UserService) { 
    
  }
  
  async ngOnInit() {
    try {
      await this.getTasks()
    } catch (error) {
      return error
    }
  }

  getTasks(){
    this.user.tasks()
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
        this.filtersLoaded = Promise.resolve(true)
      }, (error) => {
        console.error(error)
      })
  }

  goBack(){
    this.router.navigate(["/profile"])
  }

  select() {
    this.multiSelect = true
  }
  cancel(){
    this.multiSelect = false
  }

  deleteSelectedItem() {
    this.deleteTasksArr = this.tasksModel.filter(_ => _.selected);
    this.user.deleteTasks(this.deleteTasksArr)
      .subscribe(res => {
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

}
