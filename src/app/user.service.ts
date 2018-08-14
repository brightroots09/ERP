import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {

	private _profileUrl = "/profile"

	constructor(private http: HttpClient) { }
	
  profile(): Observable<any>{
    return this.http.get<any>(this._profileUrl)
  }

}
