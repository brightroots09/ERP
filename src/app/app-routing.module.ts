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
import { ViewAttendanceComponent } from './admin/view-attendance/view-attendance.component';
import { IndividualTaskComponent } from './employee/individual-task/individual-task.component';
import { AddProjectTaskComponent } from './admin/add-project-task/add-project-task.component';
import { MyAttendanceComponent } from './employee/my-attendance/my-attendance.component';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { ViewAllAttendanceComponent } from './admin/view-all-attendance/view-all-attendance.component';
import { ExportToPdfComponent } from './admin/export-to-pdf/export-to-pdf.component';
import { AddAbsentiesComponent } from './admin/add-absenties/add-absenties.component';
import { AdminGuard } from './admin.auth.guard';
import { GenerateTaskComponent } from './employee/generate-task/generate-task.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/employeeProfile",
    pathMatch: "full"
  },
  {
    path: "admin",
    redirectTo: "profile",
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
    canActivate: [AdminGuard]
  },
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "add_employee",
    component: AddEmployeesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "employee_details/:id",
    component: EmployeeDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "employee_delete/:id",
    component: EmployeeDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "edit_employee/:id",
    component: EmployeeDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "projects",
    component: ProjectsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "add_project",
    component: AddProjectComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "edit_project",
    component: EditProjectComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "project_details/:id",
    component: ProjectDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "project_delete/:id",
    component: ProjectDetailComponent,
    canActivate: [AdminGuard]

  },
  {
    path: "tasks",
    component: TasksComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "tasks_details/:id",
    component: TaskDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "create_tasks",
    component: AddTasksComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "projectTasksDetails/:id",
    component: ProjectTaskDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "queries",
    component: ViewQueriesComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "attendance",
    component: AttendanceComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "view_attendance/:date",
    component: ViewAttendanceComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "all_attendance/:date",
    component: ViewAllAttendanceComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "export_to_pdf/:date",
    component: ExportToPdfComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "createProjectTask/:id",
    component: AddProjectTaskComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "absenties",
    component: AddAbsentiesComponent,
    canActivate: [AdminGuard]
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
    path: "createTask",
    component: GenerateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "individualTask",
    component: IndividualTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myAttendance",
    component: MyAttendanceComponent,
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
