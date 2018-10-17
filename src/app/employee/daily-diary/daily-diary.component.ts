import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { DailyDiary } from '../../daily-diary';

@Component({
  selector: 'app-daily-diary',
  templateUrl: './daily-diary.component.html',
  styleUrls: ['./daily-diary.component.css']
})
export class DailyDiaryComponent implements OnInit {

  tasksModel;
  param;
  updateModel = new DailyDiary;
  updateDisable: Boolean = false
  nowTime;
  edit: Boolean = false;
  total_hours;
  toggleUpdate: Boolean = false;
  // time = this.nowTime.toLocaleString()

  sessionTime;
  toggleSave: Boolean = true;

  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param = params
    });
  }

  async ngOnInit() {
    try {
      const details = await this.getTasks()
      if (details != undefined || details != null) {
        this.tasksModel = details
      }
    } catch (error) {
      return error
    }
  }

  getTasks() {
    this.user.dailyDiary()
      .subscribe(res => {
        if (res.format_date) {
          this.total_hours = res.format_date
        }
        
        if (res.result.length > 0) {
          this.tasksModel = res.result
          let date = new Date().getDate()
          let date_created = new Date(res.result[0].date_created).getDate()
          if ((date == date_created) && res.result[0].morning_session != "") {
            this.toggleUpdate = true
          }
        }
        else{
          this.tasksModel = []
        }

        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate([`/employeeProfile`])
  }

  onUpdateFormSubmit() {
    this.user.addDailyDiary(this.updateModel)
      .subscribe(res => {
        this.toggleUpdate = true;
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

  onChange(value) {
    if (value == 'Select Session') {
      this.toggleSave = true
    }
    else {
      this.toggleSave = false
      this.sessionTime = value
      this.nowTime = new Date().toLocaleTimeString();
      if (value == 'Morning') {
        this.updateModel.in_time = this.nowTime
        this.updateModel.out_time = ""
      }
      if (value == 'Evening') {
        this.updateModel.out_time = this.nowTime
        this.updateModel.in_time = ""
      }
    }
  }

  toggleEveningUpdate() {
    this.edit = true
  }

  onEveningUpdateFormSubmit(dailyDiaryId) {
    this.user.addEveningUpdate(dailyDiaryId, this.updateModel, this.total_hours)
      .subscribe(res => {
        // if(res != ""){
        //   this.error = res
        // }
        // else{
        window.location.reload()
        // }
      }, (error) => {
        console.error(error)
      })
  }

}
