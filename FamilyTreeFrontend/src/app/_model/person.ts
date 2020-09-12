import { Gender } from "./gender.enum";

export class Person {
    id:number;
    name: string;
    gender: Gender;
    date:string;
    title: string;
    image: string;
    father: Person;
    mother: Person;
    spouse: Person;
    familyTree: Person;
}
