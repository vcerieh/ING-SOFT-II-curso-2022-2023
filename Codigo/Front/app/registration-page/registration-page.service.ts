import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserTransfer } from "../shared/userTransfer";
import { Usuario } from "../shared/usuario";


@Injectable({
    providedIn: 'root'
})

export class RegistrationPageService {
    
    constructor(private http: HttpClient){}

    registerUser(userName: string, user:Usuario): Observable<any>{
        let body: UserTransfer = new UserTransfer();
        body.CORREO = user.email;
        body.APELLIDOS = !!user.surname ? user.surname : '';
        body.CONTRASENA = user.pwd;
        body.DESCRIPCION = !!user.description ? user.description : '';
        body.FECHA_NACIMIENTO = !!user.fecha ? user.fecha : '';
        body.FOTO = !!user.picture ? user.picture : '';
        body.NOMBRE = user.name;
        body.NOMBRE_USUARIO = user.userName;
        body.PROCEDENCIA = !!user.localization ? user.localization : '';
        return this.http.put<any>("http://127.0.0.1:8000/" + userName + "/alta",body)
    }
}