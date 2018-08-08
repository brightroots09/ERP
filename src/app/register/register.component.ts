import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User()

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onFormSubmit(){
    this.user.resgiterUser(this.userModel)
      .subscribe(res => {
        let id = res._id;
        this.router.navigate(["/profile"])
      }, (error) => {
        console.error(error)
      })
  }

}
