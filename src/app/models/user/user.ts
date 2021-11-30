export class User {
    token: string;
    name: string;

    constructor(token: string = '', name: string = '') {
        this.token = token;
        this.name = name;
    }
}
