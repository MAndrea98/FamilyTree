import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyTree } from '../_model/family-tree';
import { WithParentDTO } from '../_model/with-parent-dto';
import { WithPartnerDTO } from '../_model/with-partner-dto';
import { FirstPersonDTO } from '../_model/first-person-dto';

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

    public addPersonWithPartner(model: WithPartnerDTO): Observable<FamilyTree> {
        return this.http.post<FamilyTree>("http://localhost:8080/familyTree/addWithPartner", model, this.httpOptions);
    }

    public addPersonWithParent(model: WithParentDTO): Observable<FamilyTree> {
        return this.http.post<FamilyTree>("http://localhost:8080/familyTree/addWithParent", model, this.httpOptions);
    }

    public addFirstPerson(model: FirstPersonDTO): Observable<FamilyTree> {
        return this.http.post<FamilyTree>("http://localhost:8080/familyTree/firstPerson", model, this.httpOptions);
    }
}
