import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  userModel;

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
      },
      (error)=>{
        console.log(error)
      } 
    )
  }

  goBack(){
    this.router.navigate(["/profile"])
  }

}
