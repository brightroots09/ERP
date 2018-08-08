import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new User()

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onFormSubmit(){
    this.user.login(this.userModel)
      .subscribe(res => {
        let id = res._id;
        this.router.navigate(["/profile"])
      }, (error) => {
        console.error(error)
      })
  }

}
