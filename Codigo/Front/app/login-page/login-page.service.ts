import { Injectable } from "@angular/core";
import { Usuario } from "../shared/usuario";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})

export class LoginPageService {

    constructor(private http: HttpClient){}

    correctLogin(userName: string, pwd: string): Observable<any>{        
        return this.http.get<any>("http://127.0.0.1:8000/"+userName+"/login?contrasena="+pwd);
    }

}