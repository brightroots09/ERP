import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { ExcelService } from '../../excel.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  attendanceModel;
  employeeModel;
  filtersLoaded: Promise<boolean>;
  param;
  dateModel;
  error;

  constructor(private router: Router, private user: UserService, private excelService:ExcelService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param = params
    });
  }

  async ngOnInit() {
    try {
      const details = await this.getAttendance()
      const employee = await this.getEmployees()
      this.attendanceModel = details
      this.employeeModel = employee
    } catch (error) {
      return error
    }
  }

  getAttendance() {
    this.user.getAttendance(this.param.date)
      .subscribe(res => {
        this.attendanceModel = res
        console.log(res)
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  getEmployees(){
    this.user.employee()
      .subscribe(res => {
        this.employeeModel = res
      }, error => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate([`/attendance`])
  }

  verify(id) {
    this.user.toggleAttendance(id, {"status": "Verified"})
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

  notVerify(id) {
    this.user.toggleAttendance(id, {"status": "Not Verified"})
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

  // htmlToExcel(){
  //   let arr = []
  //   for(let i=0; i<this.attendanceModel.length; i++){
  //     arr.push({
  //       name: this.attendanceModel[i].employee_id.profile.first_name + " " + this.attendanceModel[i].employee_id.profile.last_name,
  //       designation: this.attendanceModel[i].employee_id.designation,
  //       email: this.attendanceModel[i].employee_id.email,
  //       morning_session: this.attendanceModel[i].morning_session,
  //       evening_session: this.attendanceModel[i].evening_session,
  //       total_hours: this.attendanceModel[i].total_hours,
  //       status: this.attendanceModel[i].status,
  //       in_time: this.attendanceModel[i].in_time,
  //       out_time: this.attendanceModel[i].out_time,
  //       date: new Date(this.attendanceModel[i].date_created).toLocaleDateString()
  //     })
  //   }

  //   this.excelService.exportAsExcelFile(arr, 'Attendance Sheet')
  // }

  viewAllAttendance(){
    this.router.navigate([`/all_attendance/${this.param.date}`])
  }

}
