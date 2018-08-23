import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { TokenInterceptorService } from "./token-interceptor.service";
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ProjectTaskDetailsComponent } from './project-task-details/project-task-details.component' 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    EmployeesComponent,
    AddEmployeesComponent,
    EmployeeDetailComponent,
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    EditProjectComponent,
    TasksComponent,
    TaskDetailsComponent,
    AddTasksComponent,
    ProjectTaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
