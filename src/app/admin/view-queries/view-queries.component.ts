import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { Query } from '../../query';
@Component({
  selector: 'app-view-queries',
  templateUrl: './view-queries.component.html',
  styleUrls: ['./view-queries.component.css']
})
export class ViewQueriesComponent implements OnInit {

  queryModel;
  param;
  updateModel = new Query;
  employeeModel;

  filtersLoaded: Promise<boolean>;
  
  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.param = params
    });
  }
  
  async ngOnInit() {
    try {
      const details = await this.getTasks()
      this.queryModel = details
    } catch (error) {
      return error
    }
  }

  getTasks(){
    this.user.getAllQueries()
      .subscribe(res => {
        this.queryModel = res
        console.log(res)
        this.filtersLoaded = Promise.resolve(true);
      }, (error) => {
        console.error(error)
      })
  }

  goBack(){
    this.router.navigate([`/profile`])
  }

}
