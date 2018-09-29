import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { Updates } from '../../updates';

@Component({
  selector: 'app-my-project-details',
  templateUrl: './my-project-details.component.html',
  styleUrls: ['./my-project-details.component.css']
})
export class MyProjectDetailsComponent implements OnInit {

  projectModel;
  param;
  filtersLoaded: Promise<boolean>;
  updateModel = new Updates;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.param = params
    });

  }

  async ngOnInit() {
    try {
      const details = await this.getProjectDetails()
      if (details != undefined || details != null) {
        this.projectModel = details
      }
    } catch (error) {
      return error
    }
  }

  getProjectDetails() {
    this.user.myProjectDetails(this.param.id)
      .subscribe(res => {
        console.log("===========>", res)
        this.projectModel = res
        this.filtersLoaded = Promise.resolve(true);
      },
        (error) => {
          console.error(error)
        }
      )
  }


  goBack() {
    this.router.navigate(["/myProjects"])
  }

  // onUpdateFormSubmit() {
  //   this.user.updateProjectTasks(this.param.id, this.updateModel)
  //     .subscribe(res => {
  //       console.log(this.updateModel)
  //       window.location.reload()
  //     }, (error) => {
  //       console.error(error)
  //     })
  // }

}
