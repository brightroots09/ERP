import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

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
    path: "tasks",
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
