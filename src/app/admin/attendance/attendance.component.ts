import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  dateModel;
  error: Boolean = false

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onFormSubmit(){
    if(this.dateModel == undefined){
      this.error = true
    }
    else{
      this.router.navigate([`/view_attendance/${this.dateModel}`]);
    }
  }
}
