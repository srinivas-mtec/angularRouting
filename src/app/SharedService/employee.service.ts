import { Injectable } from '@angular/core';
import { Employee} from '../model/employee';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  saveEmployeeDetails(emp:Employee): Observable<any>{

        let body = JSON.stringify( emp );            
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
    console.log("save Emp :"+body);
  
    return this.http.post("http://localhost:8081/employee/add",body,{ headers: headers } ).pipe(map(
        (resp)=>{
          let data = resp;
          console.log("*****************")
          console.log(data);
          return data;
        }
    ))

  }
}
