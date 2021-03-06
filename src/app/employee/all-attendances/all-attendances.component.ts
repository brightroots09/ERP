import { Component, OnInit, ElementRef ,ViewChild, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { ExcelService } from '../../excel.service';
import { staggerAnimate } from '../../animation';

import { ExportToCsv } from 'export-to-csv';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-all-attendances',
  templateUrl: './all-attendances.component.html',
  styleUrls: ['./all-attendances.component.css'],
  animations: [
    staggerAnimate
  ]
})
export class AllAttendancesComponent implements OnInit {

  attendanceModel;
  employeeModel;
  filtersLoaded: Promise<boolean>;
  param;
  array;
  
  constructor(private router: Router, private user: UserService, private excelService: ExcelService, private route: ActivatedRoute) {
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
    this.user.getAllAttendance(this.param.date)
      .subscribe(res => {
        this.attendanceModel = res
        this.array = res.array
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  getEmployees() {
    this.user.employee()
      .subscribe(res => {
        this.employeeModel = res
      }, error => {
        console.error(error)
      })
  }


  goBack() {
    this.router.navigate([`/view-attendances`])
  }

  verify(id) {
    this.user.toggleAttendance(id, { "status": "Verified" })
      .subscribe(res => {
        const attendanceObj = this.attendanceModel.find(o => o.id === id);
        const index = this.attendanceModel.indexOf(attendanceObj)
        this.attendanceModel[index].status = "Verified";
      }, error => {
        console.error(error)
      })
  }

  notVerify(id) {
    this.user.toggleAttendance(id, { "status": "Not Verified" })
      .subscribe(res => {
        const attendanceObj = this.attendanceModel.find(o => o.id === id);
        const index = this.attendanceModel.indexOf(attendanceObj)
        this.attendanceModel[index].status = "Not Verified"
      }, error => {
        console.error(error)
      })
  }

  exportToPdf(){
    this.router.navigate([`/exports/${this.param.date}`])
  }

  // htmlToExcel() {
  //   let arr = []
  //   let date = new Date().toLocaleDateString()
  //   for (let i = 0; i < this.attendanceModel.length; i++) {
  //     arr.push({
  //       name: this.attendanceModel[i].employee_id.profile.first_name + " " + this.attendanceModel[i].employee_id.profile.last_name,
  //       designation: this.attendanceModel[i].employee_id.designation,
  //       email: this.attendanceModel[i].employee_id.email,
  //       morning_session: this.attendanceModel[i].morning_session,
  //       evening_session: this.attendanceModel[i].evening_session,
  //       total_hours: Math.round(this.attendanceModel[i].total_hours),
  //       status: this.attendanceModel[i].status,
  //       in_time: this.attendanceModel[i].in_time,
  //       out_time: this.attendanceModel[i].out_time,
  //       date: new Date(this.attendanceModel[i].date_created).toLocaleDateString()
  //     })
  //   }

  //   // this.excelService.exportAsExcelFile(arr, 'Attendance Sheet')

  //   const options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: true,
  //     title: `Attendance Sheet ${date}`,
  //     useBom: true,
  //     useKeysAsHeaders: true
  //   };

  //   const csvExporter = new ExportToCsv(options);

  //   csvExporter.generateCsv(arr);

  // }


  // htmlToPDF(){
  //   var data = document.getElementById('contentToConvert');  
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     var imgWidth = 208;   
  //     var pageHeight = 295;    
  //     var imgHeight = canvas.height * imgWidth / canvas.width;  
  //     var heightLeft = imgHeight;  
  
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     var position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('MYPdf.pdf'); // Generated PDF   
  //   });  
  // }

}
