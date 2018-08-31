import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { AuthService } from "../../auth.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new User()
  message;

  constructor(private _router: Router, private _auth: AuthService ) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this._auth.loginUser(this.userModel)
      .subscribe(
        res => {
          console.log(res)
          if (res.token) {
            localStorage.setItem('token', res.token)
            this._router.navigate(["/profile"])
          }
          else {
            this.message = res
          }
        },
        error => console.log(error)
      )
  }

}
