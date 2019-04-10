import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {

  attendanceModel;
  filtersLoaded: Promise<boolean>;
  param;
  error;
  in_date;
  in_time;
  out_date;
  out_time;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param = params
    });
  }

  async ngOnInit() {
    await this.getAttendance()
  }

  getAttendance(){
    this.user.attendanceDetails(this.param.id)
      .subscribe(res => {
        this.attendanceModel = res[0];
        this.in_date = (new Date(res[0].date_created)).toISOString().split('T')[0];
        this.out_date = (new Date(res[0].date_created)).toISOString().split('T')[0];
        this.filtersLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  update(){
    let obj = {
      id: this.attendanceModel.id,
      in_time: `${this.in_date}T${this.in_time}`,
      out_time: `${this.out_date}T${this.out_time}`
    }
    this.user.updateAttendance(obj)
      .subscribe(res => {
        this.router.navigate([`/view_attendance/${this.attendanceModel.date_created.split('T')[0]}`]);
      }, error => {
        console.error(error)
      })
  }

  cancel(){
    this.router.navigate([`/view_attendance/${this.attendanceModel.date_created.split('T')[0]}`]);
  }

}
