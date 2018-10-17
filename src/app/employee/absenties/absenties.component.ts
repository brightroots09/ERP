import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-absenties',
  templateUrl: './absenties.component.html',
  styleUrls: ['./absenties.component.css']
})
export class AbsentiesComponent implements OnInit {

  userModel;
  dateModel;
  error: Boolean = false;
  filtersLoaded: Promise<boolean>;

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
        this.userModel = res
        this.filtersLoaded = Promise.resolve(true);
      },
      (error)=>{
        console.log(error)
      } 
    )
  }

  goBack(){
    this.router.navigate(["/employeeProfile"])
  }
  
  absent(id){
    if(this.dateModel == undefined){
      this.error = true
    }
    else{
      this.user.addAbsenties(id, this.dateModel)
        .subscribe(res => {
          window.location.reload()
        }, error => {
          console.error(error)
        })
    }
  }

  viewAllAttendance(){
    this.router.navigate(["/view-attendances"])
  }

}

