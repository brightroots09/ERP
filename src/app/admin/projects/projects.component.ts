import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { staggerAnimate } from '../../animation';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    staggerAnimate
  ]
})
export class ProjectsComponent implements OnInit {

  projects;
  filtersLoaded: Promise<boolean>;
  deleteProjectArr = [];
  checkboxValue: boolean;

  removeArr = [];

  private multiSelect: boolean = false;

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
    this.user.projects()
      .subscribe(res => {
        this.projects = res
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack() {
    this.router.navigate(["/profile"])
  }

  select() {
    this.multiSelect = true
  }
  cancel(){
    this.multiSelect = false
  }

  deleteSelectedItem() {
    // console.log(this.deleteProjectArr)
    this.deleteProjectArr = this.projects.filter(_ => _.selected);
    this.user.deleteprojects(this.deleteProjectArr)
      .subscribe(res => {
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

}
