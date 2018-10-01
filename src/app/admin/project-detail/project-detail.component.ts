import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { UserService } from '../../user.service';
import { Updates } from '../../updates';
import { Project } from '../../project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  projectModel;
  param;
  filtersLoaded: Promise<boolean>;
  updateModel = new Updates;
  tasksLoaded: Promise<boolean>;
  dailyUpdateModel;
  userModel;
  employees = [];
  message;
  warning;
  projectManager = new Project();

  private edit: boolean = false;
  private employeeEdit: boolean = false;
  private projectManagerEdit: boolean = false;
  private responsiblePersonEdit: boolean = false;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.param = params
    });

  }

  async ngOnInit() {
    try {
      await this.getProjectDetails()
      await this.getEmployee()
      await this.getProjectDailyTasks()
    } catch (error) {
      return error
    }
  }

  getProjectDetails() {
    this.user.projectDetails(this.param.id)
      .subscribe(res => {
        this.projectModel = res
        console.log("===========>", this.projectModel)
        this.employees = res
        this.filtersLoaded = Promise.resolve(true);
      },
        (error) => {
          console.error(error)
        }
      )
  }
  getEmployee() {
    this.user.employee()
      .subscribe(res => {
        console.log(res)
        this.userModel = res
      },
        (error) => {
          console.log(error)
        }
      )
  }

  getProjectDailyTasks(){
    this.user.viewDailyProjectUpdates(this.param.id)
      .subscribe(res => {
        console.log(res)
        this.dailyUpdateModel = res
        this.tasksLoaded = Promise.resolve(true)
      }, error => {
        console.error(error)
      })
  }

  toggleEdit() {
    this.edit = true
  }

  onFormSubmit() {
    this.edit = false
    this.user.editProject(this.param.id, this.projectModel)
      .subscribe(res => {
        // window.location.reload()
        this.edit = false
        // this.router.navigate([`/project_details/${this.param.id}`])
      },
        (error) => {
          console.error(error)
        })
  }

  cancelUpdate() {
    this.edit = false;
  }

  goBack() {
    this.router.navigate(["/projects"])
  }

  deleteProject() {
    this.user.deleteProject(this.param.id)
      .subscribe(res => {
        this.router.navigate(["/projects"])
      }, (error) => {
        console.error(error)
      })
  }

  onUpdateFormSubmit() {
    this.user.updateProjectTasks(this.param.id, this.updateModel)
      .subscribe(res => {
        console.log(this.updateModel)
        window.location.reload()
      }, (error) => {
        console.error(error)
      })
  }

  add_employee(id) {
    this.employees.push(id)
    this.employees.forEach((item, index) => {
      if (index !== this.employees.findIndex(i => i === item)) {
        this.employees.splice(index, 1);
      }
    });
  }

  remove(employee) {
    var index = this.employees.indexOf(employee);
    if(this.employees.length == 1){
      this.warning = 'You cannot remove all employees'
    }
    else {
      if (index > -1) {
        this.employees.splice(index, 1);
      }
    }
  }

  editEmployees(){
    this.employeeEdit = true
  }

  cancelEditEmployee(){
    this.employeeEdit = false
  }

  closeEmployeeWarning(){
    this.warning = null;
  }

  removeEmployee(employee){
    console.log(employee)
  }

  onEmployeeFormSubmit(){
    this.user.editProjectEmployees(this.param.id, this.employees)
      .subscribe(res => {
        this.employeeEdit = false;
      }, error => {
        console.error(error)
      })
  }


  editProjectManager(){
    this.projectManagerEdit = true
  }

  cancelProjectManager(){
    this.projectManagerEdit = false
  }

  onProjectManagerFormSubmit(){
    this.user.editProjectManager(this.param.id, this.projectManager)
      .subscribe(res => {
        window.location.reload()
      }, error => {
        console.error(error)
      })
  }


  editResponsiblePerson(){
    this.responsiblePersonEdit = true;
  }

  cancelResponsiblePerson(){
    this.responsiblePersonEdit = false;
  }

  onResponsiblePersonFormSubmit(){
    this.user.editResponsiblePerson(this.param.id, this.projectManager)
      .subscribe(res => {
        window.location.reload()
      }, error =>{
        console.error(error)
      })
  }

}
