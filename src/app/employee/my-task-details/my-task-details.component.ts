import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-my-task-details',
  templateUrl: './my-task-details.component.html',
  styleUrls: ['./my-task-details.component.css']
})
export class MyTaskDetailsComponent implements OnInit {

  tasksModel;
  param;
  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param = params
    });
  }

  async ngOnInit() {
    try {
      const details = await this.getTasksDetails()
      if (details != undefined || details != null) {
        this.tasksModel = details
      }
    } catch (error) {
      return error
    }
  }

  getTasksDetails() {
    this.user.myTaskDetails(this.param.id)
      .subscribe(res => {
        this.tasksModel = res[0]
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate(["/myTasks"])
  }

  toggleStatus(id) {
    let obj = {
      task_id: id,
      project_id: this.param.id
    }
    this.user.toggleTaskStatus(obj)
      .subscribe(res => {
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

}
