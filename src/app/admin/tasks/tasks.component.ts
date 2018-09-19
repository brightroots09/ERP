import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasksModel;
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
      const details = await this.getTasks()
      if(details != undefined || details != null){
        this.tasksModel = details
      }
    } catch (error) {
      return error
    }
  }

  getTasks(){
    this.user.tasks()
      .subscribe(res => {
        console.log(res)
        this.tasksModel = res
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
