import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NbThemeModule, NbSidebarModule, NbLayoutModule,  NbMenuModule, NbMenuService, NbSidebarService, NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbUserModule, NbListModule, NbAlertModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * -------------
 * ADMIN IMPORTS
 * -------------
 */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { EmployeesComponent } from './admin/employees/employees.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { EmployeeDetailComponent } from './admin/employee-detail/employee-detail.component';
import { AddEmployeesComponent } from './admin/add-employees/add-employees.component';
import { ProjectDetailComponent } from './admin/project-detail/project-detail.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { EditProjectComponent } from './admin/edit-project/edit-project.component';
import { TokenInterceptorService } from "./token-interceptor.service";
import { TaskDetailsComponent } from './admin/task-details/task-details.component';
import { AddTasksComponent } from './admin/add-tasks/add-tasks.component';
import { ProjectTaskDetailsComponent } from './admin/project-task-details/project-task-details.component';
import { ViewQueriesComponent } from './admin/view-queries/view-queries.component' ;
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { ViewAttendanceComponent } from './admin/view-attendance/view-attendance.component';
import { ViewAllAttendanceComponent } from './admin/view-all-attendance/view-all-attendance.component';
import { AddProjectTaskComponent } from './admin/add-project-task/add-project-task.component';
import { ExportToPdfComponent } from './admin/export-to-pdf/export-to-pdf.component';
import { AddAbsentiesComponent } from './admin/add-absenties/add-absenties.component';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * ----------------
 * EMPLOYEE IMPORTS
 * ----------------
 */
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { MyProjectsComponent } from './employee/my-projects/my-projects.component';
import { MyProjectDetailsComponent } from './employee/my-project-details/my-project-details.component';
import { MyTasksComponent } from './employee/my-tasks/my-tasks.component';
import { MyTaskDetailsComponent } from './employee/my-task-details/my-task-details.component';
import { QueryComponent } from './employee/query/query.component';
import { QueryDetailsComponent } from './employee/query-details/query-details.component';
import { DailyDiaryComponent } from './employee/daily-diary/daily-diary.component';
import { MyProjectTaskComponent } from './employee/my-project-task/my-project-task.component';
import { DailyUpdateComponent } from './employee/daily-update/daily-update.component';
import { IndividualTaskComponent } from './employee/individual-task/individual-task.component';
import { MyAttendanceComponent } from './employee/my-attendance/my-attendance.component';
import { GenerateTaskComponent } from './employee/generate-task/generate-task.component';
import { GroupByPipe } from './group-by.service';


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
    ProjectTaskDetailsComponent,
    PageNotFoundComponent,
    EmployeeProfileComponent,
    EmployeeLoginComponent,
    MyProjectsComponent,
    MyProjectDetailsComponent,
    MyTasksComponent,
    MyTaskDetailsComponent,
    QueryComponent,
    QueryDetailsComponent,
    DailyDiaryComponent,
    MyProjectTaskComponent,
    DailyUpdateComponent,
    ViewQueriesComponent,
    ViewAttendanceComponent,
    IndividualTaskComponent,
    AddProjectTaskComponent,
    MyAttendanceComponent,
    AttendanceComponent,
    ViewAllAttendanceComponent,
    GroupByPipe,
    ExportToPdfComponent,
    AddAbsentiesComponent,
    GenerateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NbAccordionModule,
    NbButtonModule,
    NbUserModule,
    NbListModule,
    NbAlertModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, {provide: LocationStrategy, useClass: HashLocationStrategy}, NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
