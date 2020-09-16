import { User } from './user';
import { Person } from './person';

export class FamilyTree {
    id: number;
	name: string;
	description: string;
	members: Person[];
	user: User;
}
