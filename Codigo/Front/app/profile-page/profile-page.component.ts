import { Component, OnChanges, OnInit } from "@angular/core";
import { Usuario } from "../shared/usuario";
import { ProfilePageService } from "./profile-page.service";


@Component({
    selector: 'pm-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
    //providers: [MessageService]
})

export class ProfilePageComponent implements OnInit, OnChanges{

    user: Usuario = new Usuario();
    modifiedUser: Usuario = new Usuario();
    modify: boolean = false;

    constructor(private profileService: ProfilePageService){}

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('user')!);
    }

    ngOnChanges(){

    }

    editInfo(){
        if (this.modify == false){
            this.modify = true;
        }else{
            if (!(this.user.userName === this.modifiedUser.userName) && this.modifiedUser.userName.length > 0){
                //llamada de modificación de username ¡¡hay que comprobar que no haya otro user con ese nombre!!
                this.profileService.editUser(this.user.userName, "NOMBRE_USUARIO", this.modifiedUser.userName).subscribe(data => {
                    this.user.userName = data.USUARIO[1];
                    this.modifiedUser.userName = '';
                    sessionStorage.setItem('user', JSON.stringify(this.user))
                });
            }
            if (!(this.user.email === this.modifiedUser.email) && this.modifiedUser.email.length > 0){
                this.profileService.editUser(this.user.userName, "EMAIL", this.modifiedUser.email).subscribe(data => {
                    this.user.email = data.USUARIO[0];
                    this.modifiedUser.email = '';
                    sessionStorage.setItem('user', JSON.stringify(this.user))
                });
            }
            if (!(this.user.name === this.modifiedUser.name) && this.modifiedUser.name.length > 0){
                this.profileService.editUser(this.user.userName, "NOMBRE", this.modifiedUser.name).subscribe(data => {
                    this.user.name = data.USUARIO[5];
                    this.modifiedUser.name = '';
                    sessionStorage.setItem('user', JSON.stringify(this.user))
                });
            }
            if (!!this.modifiedUser.surname && !(this.user.surname === this.modifiedUser.surname)){
                this.profileService.editUser(this.user.userName, "APELLIDOS", this.modifiedUser.surname).subscribe(data => {
                    this.user.surname = data.USUARIO[6];
                    this.modifiedUser.surname = '';
                    sessionStorage.setItem('user', JSON.stringify(this.user))
                });
            }
            if (!!this.modifiedUser.description && !(this.user.description === this.modifiedUser.description)){
                this.profileService.editUser(this.user.userName, "DESCRIPCION", this.modifiedUser.description).subscribe(data => {
                    this.user.description = data.USUARIO[7];
                    this.modifiedUser.description = '';
                    sessionStorage.setItem('user', JSON.stringify(this.user)) 
                });
            }
            if (!!this.modifiedUser.localization && !(this.user.localization === this.modifiedUser.localization)){
                this.profileService.editUser(this.user.userName, "PROCEDENCIA", this.modifiedUser.localization).subscribe(data => {
                    this.user.localization = data.USUARIO[0];
                    this.modifiedUser.localization = '';
                    sessionStorage.setItem('user', JSON.stringify(this.user))
                });
            }
            this.modify = false;
        }
    }
}