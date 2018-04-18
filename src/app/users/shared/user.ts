export class User {

    constructor(public id?: boolean) { }
}

export interface IUser {
    id: boolean;
    url: string;
    username: string;
    email: string;
    is_staff: boolean;
    groups: any[];
}
