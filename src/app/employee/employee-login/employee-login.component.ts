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

  constructor(private _router: Router, private _auth: AuthService ) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this._auth.employeeLogin(this.userModel)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(["/employeeProfile"])
        },
        error => console.log(error)
      )
  }

}
