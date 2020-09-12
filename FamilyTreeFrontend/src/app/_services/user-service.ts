import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyTree } from '../_model/family-tree';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { 
    }

    public getAllMy(): Observable<FamilyTree[]> {
        return this.http.get<FamilyTree[]>("http://localhost:8080/familyTree", this.httpOptions);
    }
}
