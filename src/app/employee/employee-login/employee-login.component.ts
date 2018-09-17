import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { AuthService } from "../../auth.service"

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  userModel = new User()
  message;

  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this._auth.employeeLogin(this.userModel)
      .subscribe(
        res => {
          console.log(res)
          if (res.token) {
            localStorage.setItem('employeeToken', res.token)
            this._router.navigate(["/employeeProfile"])
          }
          else {
            this.message = res
          }
        },
        error => console.log(error)
      )
  }

}
