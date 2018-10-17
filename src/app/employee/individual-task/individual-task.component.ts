import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  tasksModel;
  param;
  filtersLoaded: Promise<boolean>;

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
    this.user.invidualTaskUrl()
      .subscribe(res => {
        this.tasksModel = res
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

}
