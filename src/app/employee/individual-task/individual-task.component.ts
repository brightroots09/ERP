import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { staggerAnimate } from '../../animation';

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css'],
  animations: [
    staggerAnimate
  ]
})
export class IndividualTaskComponent implements OnInit {

  tasksModel = [];
  param;
  filtersLoaded: Promise<boolean>;

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
    this.user.invidualTaskUrl()
      .subscribe(res => {
        for(let task in res) {
          let now_date = new Date()
          let task_date;
          if(res[task].updated_date != null) {
            task_date = new Date(res[task].updated_date)
          }
          else {
            task_date = new Date(res[task].date_created)
          }
          if(task_date.getDate() == now_date.getDate() && task_date.getMonth() == now_date.getMonth() || res[task].status == 'completed'){
            this.tasksModel.push(res[task])
          }
          else {
            res[task].status = "expired"
            this.tasksModel.push(res[task])
          }
        }
        // this.tasksModel = res
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack(){
    this.router.navigate(["/employeeProfile"])
  }

  toggleStatus(id) {
    let obj = {
      task_id: id
    }
    this.user.toggleTaskStatus(obj)
      .subscribe(res => {
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

  updateTicket(id) {
    let obj = {
      task_id: id
    }
    this.user.updateTicket(obj)
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

}
