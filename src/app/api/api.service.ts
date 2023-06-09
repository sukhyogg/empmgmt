import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postemp(data:any) {
    return this.http.post<any> ("http://localhost:3000/posts", data).pipe(map((res:any)=>
    {
      return res;
    }))
  }
  getemp() {
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=> {
      return res;
    }))
  }
  
  deleteemp(id : number) {
    return this.http.delete<any>("http://localhost:3000/posts/" +id).pipe(map((res:any)=> {
      return res;
    }))
  }

  editemp( id : number, data : any) {
    return this.http.patch<any>("http://localhost:3000/posts/" +id, data).pipe(map((res:any)=> {
      return res;
    }))
  }
}
