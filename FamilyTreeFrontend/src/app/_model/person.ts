import { FamilyTree } from './family-tree';

export class Person {
    familyTreeId:number;
    name: string;
    date:string;
    title: string;
    image: string;
    fatherID: number;
    motherID: number;
    spouseID: number;
    familyTree: FamilyTree;
}
