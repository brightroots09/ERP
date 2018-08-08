import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userModel = {}

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    this.user.profile()
      .subscribe(res => {
        console.log(res)
        this.userModel = res
      }, (error) => {
        console.error(error)
      })
  }



}
