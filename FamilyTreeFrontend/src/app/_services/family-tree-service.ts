import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyTree } from '../_model/family-tree';

@Injectable({
    providedIn: 'root'
})
export class FamilyTreeService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { 
    }

    public addNewFamilyTree(tree: FamilyTree): Observable<FamilyTree> {
        return this.http.post<FamilyTree>("http://localhost:8080/familyTree", tree, this.httpOptions);
    }

    public editFamilyTree(tree: FamilyTree): Observable<FamilyTree> {
        return this.http.put<FamilyTree>("http://localhost:8080/familyTree", tree, this.httpOptions);
    }

    public deleteFamilyTree(id: number): Observable<FamilyTree> {
        return this.http.delete<FamilyTree>("http://localhost:8080/familyTree/" + id, this.httpOptions);
    }
}
