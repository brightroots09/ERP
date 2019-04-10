import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { ExcelService } from '../../excel.service';
import { staggerAnimate } from '../../animation';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css'],
  animations: [
    staggerAnimate
  ]
})
export class AttendancesComponent implements OnInit {

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
        const attendanceObj = this.attendanceModel.find(o => o.id === id);
        const index = this.attendanceModel.indexOf(attendanceObj)
        this.attendanceModel[index].status = "Verified";
      }, error => {
        console.error(error)
      })
  }

  notVerify(id) {
    this.user.toggleAttendance(id, {"status": "Not Verified"})
      .subscribe(res => {
        const attendanceObj = this.attendanceModel.find(o => o.id === id);
        const index = this.attendanceModel.indexOf(attendanceObj)
        this.attendanceModel[index].status = "Not Verified"
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
    this.router.navigate([`/allAttendances/${this.param.date}`])
  }

  edit(id){
    this.router.navigate([`/attendance_details/${id}`])
  }

}
