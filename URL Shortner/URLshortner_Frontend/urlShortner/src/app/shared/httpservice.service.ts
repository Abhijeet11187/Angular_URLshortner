import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  url="http://localhost:3000/urlShorten";

  constructor(private http:HttpClient) { }
  register(formData){
    console.log('In the register service');
    return this.http.post<any>(this.url+"/register",formData);
   }
   login(userName,formdata){
     console.log('In the Login service');
    return this.http.post(this.url+"/login/"+userName,formdata);
  }
  shortURL(userName,formdata){
    console.log("in the Short URL  service");
    userName?"":userName="***";
    return this.http.post(this.url+"/saveURl/"+userName,formdata);
  }
  getUserInfo(userName){
    return this.http.get(this.url+"/"+userName);
  }
}
