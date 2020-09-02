import { Gender } from "./gender.enum";

export class Person {
    firstName: string;
    middleName: string;
    lastName: string;
    maidenName: string;
    gender: Gender;
    dateOfBirth: Date;
    dateOdDeath: Date;
    father: Person;
    mother: Person;

}
