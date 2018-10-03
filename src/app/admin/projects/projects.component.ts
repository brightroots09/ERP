import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { trigger, state, style, transition, animate, query, stagger, keyframes, sequence } from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('* => *', [
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ])
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
        console.log("======>", res)
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
