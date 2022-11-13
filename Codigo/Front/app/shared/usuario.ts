export class Usuario{
    email: string;
    userName: string;
    pwd: string;
    picture?: string;
    fecha?: string;
    name: string;    
    surname?: string;
    description?: string;
    localization?: string;

    constructor(){
        this.userName = '';
        this.pwd = '';
        this.email = '';
        this.name = '';
    }
}