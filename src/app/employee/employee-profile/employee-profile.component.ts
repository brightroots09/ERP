import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { Password } from '../../password';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  filtersLoaded: Promise<boolean>;
  projectsLoaded: Promise<boolean>;
  tasksLoaded: Promise<boolean>;
  individualTasksLoaded: Promise<boolean>;
  queriesLoaded: Promise<boolean>;

  edit: boolean = false;

  userModel;
  passwordModel = new Password();
  message;
  BarChart = [];

  projectModel;
  taskModel;
  individualTaskModel;
  queryModel;

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

  async ngOnInit() {
    try {
      const profile = await this.getProfile()
      this.userModel = profile

      this.summaryChart.push(
        {
          "name": "Projects",
          "value": 5
        },
        {
          "name": "Tasks",
          "value": 15
        },
        {
          "name": "Individual Tasks",
          "value": 5
        },
        {
          "name": "Queries / Requests",
          "value": 14
        }
      )

      Object.assign(this.summaryChart)

    } catch (error) {
      return error
    }
  }

  summaryChart = []

  getProfile() {
    this.user.employeeProfile()
      .subscribe(res => {
        this.userModel = res[0]
        console.log("==================>", res)
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/employeeLogin'])
          }
        }
      })
    }

    changePassword(){
      this.edit = !this.edit
    }

    onFormSubmit(user){
      if(user.password != this.passwordModel.old_password || this.passwordModel.confirm_password != this.passwordModel.new_password){
        this.message = "Cannot update password"
      }
      else {
        this.user.changePassword(user.employee_id, this.passwordModel)
          .subscribe(res => {
            this.message = null
            window.location.reload()
          }, error => {
            console.error(error)
          })
      }
    }
}
