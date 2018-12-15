import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { ExcelService } from '../../excel.service';
import { staggerAnimate } from '../../animation';

@Component({
  selector: 'app-my-attendance',
  templateUrl: './my-attendance.component.html',
  styleUrls: ['./my-attendance.component.css'],
  animations: [
    staggerAnimate
  ]
})
export class MyAttendanceComponent implements OnInit {

  attendanceModel;
  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService, private excelService:ExcelService) {
  }

  async ngOnInit() {
    try {
      const details = await this.getAttendance()
      this.attendanceModel = details
    } catch (error) {
      return error
    }
  }

  getAttendance() {
    this.user.myAttendance()
      .subscribe(res => {
        this.attendanceModel = res
        this.getTotal()
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate([`/employeeProfile`])
  }

  getTotal() {
    var total = 0;
    for (var i = 0; i < this.attendanceModel.length; i++) {
      var hours = this.attendanceModel[i].total_hours;
      total = total + parseFloat(hours)
    }
    return total
  }

  // htmlToExcel(){

  //   let arr = []

  //   for(let i=0; i<this.attendanceModel.length; i++){
  //     arr.push({
  //       morning_session: this.attendanceModel[i].morning_session,
  //       evening_session: this.attendanceModel[i].evening_session,
  //       total_hours: this.attendanceModel[i].total_hours,
  //       status: this.attendanceModel[i].status,
  //       in_time: this.attendanceModel[i].in_time,
  //       out_time: this.attendanceModel[i].out_time,
  //       date: new Date(this.attendanceModel[i].date_created).toLocaleDateString()
  //     })
  //   }
  //   this.excelService.exportAsExcelFile(arr, `Attendance Sheet`)
  // }

}
