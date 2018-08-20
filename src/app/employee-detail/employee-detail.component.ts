import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  userModel;
  param;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) { 

    this.route.params.subscribe( params => {
      this.param = params 
    });

  }

  async ngOnInit() {
    try {
      const details = await this.getEmployeeDetails()
      if(details != undefined || details != null){
        this.userModel = details
      }
    } catch (error) {
      return error
    }
  }

  getEmployeeDetails(){
    this.user.employeeDetails(this.param.id)
      .subscribe(res => {
        console.log("===========>", res)
        this.userModel = res[0]
      }, 
      (error) => {
        console.error(error)
      }
    )
  }

}
