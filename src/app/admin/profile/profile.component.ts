import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { Chart } from 'chart.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  filtersLoaded: Promise<boolean>;
  employeesLoaded: Promise<boolean>;
  projectsLoaded: Promise<boolean>;
  tasksLoaded: Promise<boolean>;
  queriesLoaded: Promise<boolean>;
  chartLoaded: Promise<boolean>;

  userModel;
  employeeModel;
  projectModel;
  taskModel;
  queryModel;

  BarChart = [];

  constructor(private router: Router, private user: UserService) { }
  view: any[] = [650, 350];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ngOnInit() {
    try {
      this.getProfile();
      this.getEmployee();
      this.getProjects();
      this.getTasks();
      this.getQueries();

      this.summaryChart.push(
        {
          "name": "Employee",
          "value": 0
        },
        {
          "name": "Projects",
          "value": 0
        },
        {
          "name": "Tasks",
          "value": 0
        },
        {
          "name": "Queries / Requests",
          "value": 0
        }
      )

      if((this.summaryChart[0].value > 0) && (this.summaryChart[1].value > 0) && (this.summaryChart[2].value > 0) && (this.summaryChart[3].value > 0) ){
        Object.assign(this.summaryChart)
      }
    
    } catch (error) {
      return error
    }
  }

  summaryChart = []

  getProfile() {
    this.user.profile()
      .subscribe(res => {
        this.userModel = res[0]
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      })
  }

  getEmployee() {
    this.user.employee()
      .subscribe(res => {
        this.summaryChart[0].value = Object.keys(res).length
        this.employeeModel = res
        this.employeesLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  getProjects() {
    this.user.projects()
      .subscribe(res => {
        this.summaryChart[1].value = Object.keys(res).length
        // this.summaryChart.push({"name": "Projects", "value": Object.keys(res).length})
        this.projectModel = res
        this.projectsLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  getTasks() {
    this.user.tasks()
      .subscribe(res => {
        this.summaryChart[2].value = Object.keys(res).length
        // this.summaryChart.push({"name": "Tasks", "value": Object.keys(res).length})
        this.taskModel = res;
        this.tasksLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  getQueries() {
    this.user.getAllQueries()
      .subscribe(res => {
        this.summaryChart[3].value = Object.keys(res).length
        // this.summaryChart.push({"name": "Queries", "value": Object.keys(res).length})
        this.queryModel = res;
        this.queriesLoaded = Promise.resolve(true);
      }, error => {
        console.error(error)
      })
  }


}
