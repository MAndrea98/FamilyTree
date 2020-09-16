import { FamilyTree } from './family-tree';
import { Gender } from "./gender.enum";

export class Person {
    familyTreeId:number;
    name: string;
    gender: Gender;
    date:string;
    title: string;
    image: string;
    fatherID: number;
    motherID: number;
    spouseID: number;
    familyTree: FamilyTree;
}
