import { Component, OnInit } from "@angular/core";
import { LoginPageService } from "./login-page.service";
import { MessageService } from 'primeng/api';
import { Router } from "@angular/router";
import { Usuario } from "../shared/usuario";

@Component({
    selector: 'pm-pag-prin',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
    providers: [MessageService]
})

export class LoginPageComponent implements OnInit {

    password: string = '';
    userName: string = '';
    user: Usuario = new Usuario();
    correctUserPwd: boolean = false;

    constructor(
        private loginService: LoginPageService,
        private messaggeService: MessageService,
        private router: Router
    ) { }

    ngOnInit() { }

    login() {
        const userData = this.loginService.correctLogin(this.userName, this.password).subscribe(data => {
            //console.log(data.USUARIO);
            let aux = data.USUARIO.toString();
            if (aux!="error") {
                console.log("Login Correcto");
                this.user.email = data.USUARIO[0];
                this.user.userName = data.USUARIO[1];
                this.user.pwd = data.USUARIO[2];
                this.user.picture = data.USUARIO[3];
                this.user.name = data.USUARIO[5];
                this.user.surname = data.USUARIO[6];
                this.user.description = data.USUARIO[7];
                this.user.localization = data.USUARIO[8];
                sessionStorage.setItem('user', JSON.stringify(this.user));
                this.router.navigateByUrl("/home");
            } else {
                console.log("Usuario o contraseña incorrectos");
                this.messaggeService.add({ severity: 'error', summary: 'Login Error', detail: 'Incorrect User or Password' });
            }
        });
    }
}