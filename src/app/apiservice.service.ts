import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiUrl="http://localhost:2000/computer";
  createUrl="http://localhost:2000/computer";
  constructor(private http:HttpClient) { }

  //Get All Data Observer...
  getAllSubject():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }
   //create data
   createData(data:any):Observable<any>{
    console.log(data,'Data Created')
    return this.http.post(`${this.createUrl}`,data);
  }
   //delete data...
   deleteData(id:any):Observable<any>{
    let ids= id;
    return this.http.delete(`${this.createUrl}/${ids}`);
  }
   //updateData Data
  updateData(data:any, id:any):Observable<any>{
    let ids=id;
    return this.http.put(`${this.apiUrl}/${ids}`,data);
  }
  //getsingledata
  getsingleData(id:any):Observable<any>{
    let ids =id;
    return this.http.get( `${this.createUrl}/${ids}`);
  }
}
