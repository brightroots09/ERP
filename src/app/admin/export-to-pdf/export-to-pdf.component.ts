import { Component, OnInit, ElementRef ,ViewChild, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { ExcelService } from '../../excel.service';

import { ExportToCsv } from 'export-to-csv';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-export-to-pdf',
  templateUrl: './export-to-pdf.component.html',
  styleUrls: ['./export-to-pdf.component.css']
})
export class ExportToPdfComponent implements OnInit {
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
    this.user.getAllAttendance()
      .subscribe(res => {
        this.attendanceModel = res.result
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
    this.router.navigate([`/all_attendance`])
  }

  verify(id) {
    this.user.toggleAttendance(id, { "status": "Verified" })
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

  notVerify(id) {
    this.user.toggleAttendance(id, { "status": "Not Verified" })
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }

  htmlToExcel() {
    // let arr = []
    // let date = new Date().toLocaleDateString()
    // var data = document.getElementById('contentToConvert');  

    // for (let i = 0; i < this.attendanceModel.length; i++) {
    //   arr.push({
    //     name: this.attendanceModel[i].employee_id.profile.first_name + " " + this.attendanceModel[i].employee_id.profile.last_name,
    //     designation: this.attendanceModel[i].employee_id.designation,
    //     email: this.attendanceModel[i].employee_id.email,
    //     morning_session: this.attendanceModel[i].morning_session,
    //     evening_session: this.attendanceModel[i].evening_session,
    //     total_hours: Math.round(this.attendanceModel[i].total_hours),
    //     status: this.attendanceModel[i].status,
    //     in_time: this.attendanceModel[i].in_time,
    //     out_time: this.attendanceModel[i].out_time,
    //     date: new Date(this.attendanceModel[i].date_created).toLocaleDateString()
    //   })
    // }

    // this.excelService.exportAsExcelFile(data, 'Attendance Sheet')


    // const options = {
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalseparator: '.',
    //   showLabels: true,
    //   showTitle: true,
    //   title: `Attendance Sheet ${date}`,
    //   useBom: true,
    //   useKeysAsHeaders: true
    // };

    // const csvExporter = new ExportToCsv(options);

    // csvExporter.generateCsv(data);

  }


  htmlToPDF(){
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }

}
