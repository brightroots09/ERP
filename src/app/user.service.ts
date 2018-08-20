import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from "@angular/router"
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {

	private _profileUrl = "/profile";
  private _employeeUrl = "/employees";
  private _employeeDetailUrl = "/employee"
  
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
	
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

}
