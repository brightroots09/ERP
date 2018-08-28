import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { EmployeesComponent } from './admin/employees/employees.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { AddEmployeesComponent } from './admin/add-employees/add-employees.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { EditProjectComponent } from './admin/edit-project/edit-project.component';
import { ProjectDetailComponent } from './admin/project-detail/project-detail.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { EmployeeDetailComponent } from './admin/employee-detail/employee-detail.component';
import { TaskDetailsComponent } from './admin/task-details/task-details.component';
import { AddTasksComponent } from './admin/add-tasks/add-tasks.component';
import { ProjectTaskDetailsComponent } from './admin/project-task-details/project-task-details.component';
import { ViewQueriesComponent } from './admin/view-queries/view-queries.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { MyProjectsComponent } from './employee/my-projects/my-projects.component';
import { MyProjectDetailsComponent } from './employee/my-project-details/my-project-details.component';
import { MyTasksComponent } from './employee/my-tasks/my-tasks.component';
import { MyTaskDetailsComponent } from './employee/my-task-details/my-task-details.component';
import { QueryComponent } from './employee/query/query.component';
import { QueryDetailsComponent } from './employee/query-details/query-details.component';
import { DailyDiaryComponent } from './employee/daily-diary/daily-diary.component';
import { MyProjectTaskComponent } from './employee/my-project-task/my-project-task.component';
import { DailyUpdateComponent } from './employee/daily-update/daily-update.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add_employee",
    component: AddEmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employee_details/:id",
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employee_delete/:id",
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit_employee/:id",
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "projects",
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add_project",
    component: AddProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit_project",
    component: EditProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "project_details/:id",
    component: ProjectDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "project_delete/:id",
    component: ProjectDetailComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "tasks",
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "tasks_details/:id",
    component: TaskDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "create_tasks",
    component: AddTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "projectTasksDetails/:id",
    component: ProjectTaskDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "queries",
    component: ViewQueriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "employeeLogin",
    component: EmployeeLoginComponent
  },
  {
    path: "employeeProfile",
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myProjects",
    component: MyProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myProjectDetails/:id",
    component: MyProjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myTasks",
    component: MyTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myTaskDetails/:id",
    component: MyTaskDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myProjectTask/:id",
    component: MyProjectTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "query",
    component: QueryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "queryDetails/:id",
    component: QueryDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dailyUpdate/:id",
    component: DailyUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dailyDiary",
    component: DailyDiaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
