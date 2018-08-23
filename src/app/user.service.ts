import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, ObservableInput } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {

	private _profileUrl = "/profile";
  private _employeeUrl = "/employees";
  private _employeeDetailUrl = "/employee";
  private _addEmployeeUrl = "/add_employee";
  private _deleteEmployeeUrl = "/delete_employee";
  private _editEmployeeUrl = "/edit_employee";
  private _projectsUrl = "/projects";
  private _projectDetails = "/project_details";
  private _editProject = "/edit_project";
  private _adddProject = "/create_project";
  private _projectDelete = "/project_delete";
  private _tasks = "/tasks";
  private tasksDetailsUrl = "/tasks_details";
  private _createTasks = "/create_tasks";
  private _projectTasksDetails = "/project_tasks_details";
  private _editTaskUrl = "/edit_task";
  private _editProjectTaskUrl = "/edit_project_task";
  private _deleteTask = "/delete_task";

  constructor(private http: HttpClient) { }
	
  profile(): Observable<any>{
    return this.http.get<any>(this._profileUrl)
  }

  employee(): Observable<any>{
    return this.http.get<any>(this._employeeUrl)
  }

  employeeDetails(id): Observable<any>{
    let url = this._employeeDetailUrl + "/" + id
    return this.http.get<any>(url)
  }

  addEmployee(data): Observable<any>{
    return this.http.post<any>(this._addEmployeeUrl, data)
  }

  deleteEmployee(id): Observable<any>{
    let url = this._deleteEmployeeUrl + "/" + id
    return this.http.post<any>(url, id)
  }

  editEmployee(id, data): Observable<any>{
    let url = this._editEmployeeUrl + "/" + id
    return this.http.post<any>(url, data)
  }

  projects(){
    return this.http.get<any>(this._projectsUrl)
  }

  projectDetails(id){
    let url = this._projectDetails + "/" + id
    return this.http.get<any>(url)
  }

  editProject(id, data){
    let url = this._editProject + "/" + id
    return this.http.post<any>(url, data)
  }

  addProject(project, employee){
    let obj = {
      project,
      employee
    }
    return this.http.post<any>(this._adddProject, obj)
  }

  deleteProject(id): Observable<any>{
    let url = this._projectDelete + "/" + id
    return this.http.post<any>(url, id)
  }

  tasks(): Observable<any>{
    return this.http.get<any>(this._tasks)
  }

  tasksDetails(id): Observable<any>{
    let url = this.tasksDetailsUrl + "/" + id;
    return this.http.get<any>(url)
  }

  createTasks(tasks, projects): Observable<any>{
    let obj = {
      tasks,
      projects
    }
    return this.http.post<any>(this._createTasks, obj)
  }

  projectTasksDetails(id): Observable<any>{
    let url = this._projectTasksDetails + "/" + id;
    return this.http.get(url)
  }

  editTask(id, data):Observable<any>{
    let url = this._editTaskUrl + "/" + id;
    return this.http.post(url, data)
  }

  editProjectTask(id, data):Observable<any>{
    let url = this._editProjectTaskUrl + "/" + id;
    return this.http.post(url, data)
  }

  deleteTask(id): Observable<any>{
    let url = this._deleteTask + "/" + id
    return this.http.post(url, id)
  }

}
