import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-my-project-task',
  templateUrl: './my-project-task.component.html',
  styleUrls: ['./my-project-task.component.css']
})
export class MyProjectTaskComponent implements OnInit {

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
    this.user.myProjectTaskDetails(this.param.id)
      .subscribe(res => {
        console.log(res)
        this.tasksModel = res
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate([`/myProjectDetails/${this.param.id}`])
  }

  toggleStatus(id){
    let obj = {
      task_id: id,
      project_id: this.param.id
    }
    this.user.toggleTaskStatus(obj)
      .subscribe(res => {
        console.log(res)
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }
}
