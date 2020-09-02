import { FamilyTree } from './family-tree';

export class User {
    username: string;
    password: string;
    repeatPassword: string;
    email: string;
    familyTrees: Array<FamilyTree>;
}
