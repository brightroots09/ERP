import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-attendances',
  templateUrl: './view-attendances.component.html',
  styleUrls: ['./view-attendances.component.css']
})
export class ViewAttendancesComponent implements OnInit {

  dateModel;
  error: Boolean = false

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }

  onFormSubmit(){
    if(this.dateModel == undefined){
      this.error = true
    }
    else{
      this.router.navigate([`/attendances/${this.dateModel}`]);
    }
  }
}