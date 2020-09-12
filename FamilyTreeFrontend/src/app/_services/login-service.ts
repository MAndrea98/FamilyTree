import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_model/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { 
    }

    public login(user: User): Observable<User> {
        return this.http.post<User>("http://localhost:8080/user/login", user, this.httpOptions);
    } 

    public registration(user: User): Observable<User> {
        return this.http.post<User>("http://localhost:8080/user/registration", user, this.httpOptions);
    }

    public logout(user: User): Observable<User> {
        return this.http.post<User>("http://localhost:8080/user/logout", user, this.httpOptions);
    }

    public changeDate(user: User, oldPassword:string): Observable<User> {
        return this.http.put<User>("http://localhost:8080/user/change/" + oldPassword, user, this.httpOptions);
    }
    
}
