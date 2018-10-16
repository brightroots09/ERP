import { Component, OnInit, Optional } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { staggerAnimate } from '../../animation';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [
    staggerAnimate    
  ]
})
export class EmployeesComponent implements OnInit {
  
  userModel;
  filtersLoaded: Promise<boolean>;

  deleteTasksArr = [];
  checkboxValue: boolean;

  removeArr = [];

  private multiSelect: boolean = false;

  constructor(private router: Router, private user: UserService) { }

  async ngOnInit() {
    try {
      const employee = await this.getEmployee()
      if(employee != undefined || employee != null){
        this.userModel = employee
      }
    } catch (error) {
      return error
    }
  }

  getEmployee(){
    this.user.employee()
      .subscribe(res => {
        console.log(res)
        this.userModel = res
        this.filtersLoaded = Promise.resolve(true);
      },
      (error)=>{
        console.log(error)
      } 
    )
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
    this.deleteTasksArr = this.userModel.filter(_ => _.selected);
    this.user.deleteEmployees(this.deleteTasksArr)
      .subscribe(res => {
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

}
