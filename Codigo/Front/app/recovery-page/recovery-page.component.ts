import { Component, OnInit } from "@angular/core";
import { MessageService } from 'primeng/api';
import { Router } from "@angular/router";

@Component({
    selector: 'pm-recovery-page',
    templateUrl: './recovery-page.component.html',
    styleUrls: ['./recovery-page.component.css'],
    providers: [MessageService]
})

export class RecoveryPageComponent implements OnInit {

    email: string = '';
    emailSent: boolean = false;
    recoveryCode: string = "RE12";
    inputRecoverycode: string = '';
    correctCode: boolean = false;
    pwd: string = '';
    repeatedPwd: string = '';

    constructor(
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    recovery() {
        if (this.email.includes("@gmail.com") || this.email.includes("@hotmail.com")) {
            //envia email al usuario con codigo de recuperación si el email existe
            this.emailSent = true;
        } else {
            this.messageService.add({ severity: 'error', summary: 'Email Error', detail: 'Invalid Email Form' })
        }

    }
    checkRecoveryCode() {
        // if (this.inputRecoverycode === this.recoveryCode) {
        //     this.correctCode = true;
        // } else {
        //     this.inputRecoverycode = '';
        //     this.messageService.add({ severity: 'error', summary: 'Recovery Code Error', detail: 'Incorrect Recovery Code' })
        // }
        this.router.navigateByUrl("/login");
    }

    savePwd() {
        if (this.pwd === this.repeatedPwd) {
            if (this.pwd.length >= 8) {
                //llama al back para guardar la nueva contraseña
                this.router.navigateByUrl("/login");
            } else {
                this.messageService.add({ severity: 'error', summary: 'Password Error', detail: 'Password must be at least 8 characters long' })
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Password Error', detail: 'Passwords must match' })
        }
    }
}