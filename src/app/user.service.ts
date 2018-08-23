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
  private _addEmployeeUrl = "/add_employee"
  private _editEmployeeUrl = "/edit_employee";
  private _projectsUrl = "/projects";
  private _projectDetails = "/project_details";
  private _editProject = "/edit_project";
  private _adddProject = "/create_project";

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

}
