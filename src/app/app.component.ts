import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { NbSidebarService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  items: NbMenuItem[] = [
    {
      title: "Add Employee",
      icon: 'fas fa-plus-circle',
      link: '/add_employee'
    },
    {
      title: "View Employees",
      icon: "far fa-user",
      link: '/employees'
    },
    {
      title: "Projects",
      icon: "fas fa-project-diagram",
      link: '/projects'
    },
    {
      title: "Tasks",
      icon: "fas fa-tasks",
      link: '/tasks'
    },
    {
      title: "Queries / Requests",
      icon: "fas fa-question-circle",
      link: '/queries'
    },
    {
      title: "View Attendance",
      icon: "far fa-eye",
      link: '/attendance'
    },
    {
      title: "Add Absenties",
      icon: "far fa-times-circle",
      link: "/absenties"
    }
   ];

   itemsEmployee: NbMenuItem[] = [
    {
      title: "My Projects",
      icon: 'fas fa-project-diagram',
      link: '/myProjects'
    },
    {
      title: "My Tasks",
      icon: "fas fa-tasks",
      link: '/myTasks'
    },
    {
      title: "Query / Request",
      icon: "fas fa-question-circle",
      link: '/query'
    },
    {
      title: "Daily Update",
      icon: "fas fa-tasks",
      link: '/dailyDiary'
    },
    {
      title: "Individual Task",
      icon: "fas fa-briefcase",
      link: '/individualTask'
    },
    {
      title: "My Attendance",
      icon: "far fa-eye",
      link: '/myAttendance'
    },
    {
      title: "Holidays",
      icon: "fas fa-power-off",
      link: "/holidays"
    }
   ]

  constructor (public _authService: AuthService, private sidebarService: NbSidebarService ){ }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

}
