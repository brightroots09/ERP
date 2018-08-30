import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  attendanceModel;
  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService) {
  }

  async ngOnInit() {
    try {
      const details = await this.getAttendance()
      this.attendanceModel = details
    } catch (error) {
      return error
    }
  }

  getAttendance(){
    this.user.getAttendance()
      .subscribe(res => {
        this.attendanceModel = res
        console.log(res)
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack(){
    this.router.navigate([`/profile`])
  }

}
