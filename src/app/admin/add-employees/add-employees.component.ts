import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

  userModel = new User()
  message;
  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onFormSubmit(){
    this.user.addEmployee(this.userModel)
      .subscribe(res => {
        if(res == 'Email Already Exists'){
          this.message = res
        }
        else {
          this.router.navigate(["/employees"])
        }
      }, (error) => {
        console.error(error)
      })
  }

  cancelAdd(){
    this.router.navigate(["/profile"])
  }

  toggle(){
    this.message = null
  }

}
