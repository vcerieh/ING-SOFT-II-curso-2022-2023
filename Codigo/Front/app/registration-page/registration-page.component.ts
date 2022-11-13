import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario';
import { RegistrationPageService } from './registration-page.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
  providers: [MessageService]
})
export class RegistrationPageComponent implements OnInit {
  user: Usuario = new Usuario();

  confirmPassword: string = '';

  ageChecked: boolean = false;
  year: number = 0;
  month: number = 0;
  day: number = 0;
  inputDate: Date = new Date();

  mainDataCompleted: boolean = false;

  additionalDataCompleted: boolean = false;
  inputConfirmationCode: string = "";
  confirmationCode: string;
  constructor(
    private registrationService: RegistrationPageService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.confirmationCode = "12345";
  }

  ngOnInit(): void {
    let today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.day = today.getDate();
  }

  checkAge() {
    if (this.inputDate.getFullYear() < (this.year - 18)
      || (this.inputDate.getFullYear() == (this.year - 17) && this.inputDate.getMonth() < this.month)
      || (this.inputDate.getFullYear() == (this.year - 17) && this.inputDate.getMonth() == this.month && this.inputDate.getDate() <= this.day)) {
      this.ageChecked = true;
      console.log("input date:" + this.inputDate.toString() + "makes you over eighteen, CONTINUE");
    } else {
      console.error("input date: " + this.inputDate.toString() + "makes you underage, STOP");
      this.messageService.add({ severity: 'error', summary: 'Date Error', detail: 'You must be over eighteen' });
    }
  }

  goToAdditionalData() {
    //habrá que hacer también la confirmación con el back de que el nombre de usuario no está repetido
    if (this.user.userName.length > 0 && this.user.pwd.length > 0 && this.confirmPassword.length > 0 && this.user.email.length > 0) {
      if (this.user.pwd === this.confirmPassword) {
        if (!(this.user.pwd.length >= 8)) {
          this.messageService.add({ severity: 'error', summary: 'Password Error', detail: 'Password must be at least 8 characters long' });
        }
        if (this.user.email.includes("@gmail.com") || this.user.email.includes("@hotmail.com")) {
          this.mainDataCompleted = true;
        } else {
          console.error(this.user.email + ": email not valid");
          this.messageService.add({ severity: 'error', summary: 'Email Error', detail: 'Email not valid' });
          this.user.email = '';
        }
      } else {
        console.error(this.user.pwd + " and " + this.confirmPassword + " do not match, they must match");
        this.messageService.add({ severity: 'error', summary: 'Password Error', detail: 'Passwords do not match' });
        this.user.pwd = '';
        this.confirmPassword = '';
      }
    } else {
      console.error("All fields must be filled");
      this.messageService.add({ severity: 'error', detail: 'All fields must be filled' });
    }
  }

  goToConfirmationEmail(): void {
    if (this.user.name.length > 0) {
      this.additionalDataCompleted = true;
    } else {
      console.error("You must at least fill your name");
      this.messageService.add({ severity: 'error', summary: 'Data Error', detail: 'You must at leats fill yout name' });
    }
  }

  register() {
    if (this.inputConfirmationCode === this.confirmationCode) {
      //llamada al back para registrarse, si todo OK, se navega a home con el user en local storage / cookies!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.registrationService.registerUser(this.user.userName, this.user).subscribe(data => {
        if (!!data) {
          sessionStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigateByUrl("/home");
        } else {
          this.messageService.add({ severity: 'error', summary: 'Registration ERROR', detail: 'Error during registration' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Confirmation Code Error', detail: 'Wrong Confirmation Code' });
    }
  }
}
