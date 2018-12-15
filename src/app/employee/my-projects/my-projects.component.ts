import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { staggerAnimate } from '../../animation';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
  animations: [
    staggerAnimate
  ]
})
export class MyProjectsComponent implements OnInit {

  projects;
  filtersLoaded: Promise<boolean>;

  constructor(private router: Router, private user: UserService) { }

  async ngOnInit() {
    try {
      const projects = await this.getProjects()
      if (projects != undefined || projects != null) {
        this.projects = projects
      }
    } catch (error) {

    }
  }

  getProjects() {
    this.user.myProjects()
      .subscribe(res => {
        this.projects = res
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate(["/employeeProfile"])
  }

}
