import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyTree } from '../_model/family-tree';
import { Person } from '../_model/person';
import { PersonDTO } from '../_model/personDTO';

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

    public deleteAll(): Observable<string> {
        return this.http.delete("http://localhost:8080/familyTree", { responseType: 'text' });
    }

    public saveFamilyTree(tree: FamilyTree, persons: PersonDTO[]): Observable<FamilyTree> {
        return this.http.put<FamilyTree>("http://localhost:8080/familyTree/save/" + tree.id, persons, this.httpOptions);
    }

    public getMembers(id: number): Observable<Person[]> {
        return this.http.get<Person[]>("http://localhost:8080/familyTree/members/" + id, this.httpOptions);
    }
}
