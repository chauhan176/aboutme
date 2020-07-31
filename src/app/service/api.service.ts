import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Analytics} from '../../model/analytics';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri:string = 'http://localhost:4000/aboutme/dashboard';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  //get all visits
  public getvisits(){
    return this.http.get('http://localhost:4000/dashboard');
  }

  //get intro counters
  public updateintro(){
    return this.http.get('http://localhost:4000/intro');
  }

  //get education counters
  public updateeducation(){
    return this.http.get('http://localhost:4000/education');
  }
  
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
