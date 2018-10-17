import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { Updates } from '../../updates';

@Component({
  selector: 'app-daily-update',
  templateUrl: './daily-update.component.html',
  styleUrls: ['./daily-update.component.css']
})
export class DailyUpdateComponent implements OnInit {

  tasksModel;
  param;
  updateModel = new Updates

  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param = params
    });
  }
  
  async ngOnInit() {
    try {
      const details = await this.getTasks()
      if(details != undefined || details != null){
        this.tasksModel = details
      }
    } catch (error) {
      return error
    }
  }

  getTasks(){
    this.user.myDailyTasks(this.param.id)
      .subscribe(res => {
        this.tasksModel = res
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack(){
    this.router.navigate([`/employeeProfile`])
  }

  onUpdateFormSubmit(){
    this.user.addDailyTask(this.param.id, this.updateModel)
      .subscribe(res => {
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

}
