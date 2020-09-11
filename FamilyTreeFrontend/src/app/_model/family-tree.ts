import { User } from './user';
import { Person } from './person';

export class FamilyTree {
    id:number;
    name: String;
    description: String;
    member: Person;
    user: User; 
}
