import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _adminLoginUrl = "http://localhost:8080/admin/login";
  private _employeeLoginUrl = "http://localhost:8080/employee/employee_login"

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user){
    return this.http.post<any>(this._adminLoginUrl, user)
  }

  employeeLogin(user){
    return this.http.post<any>(this._employeeLoginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(user){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  employeeLoggedIn(){
    return !!localStorage.getItem('employeeToken')
  }

  employeeLogout(){
    localStorage.removeItem("employeeToken")
    this.router.navigate(["/employeeLogin"])
  }

  getToken(){
    return localStorage.getItem('token') ? localStorage.getItem('token') : localStorage.getItem('employeeToken')
  }

}
