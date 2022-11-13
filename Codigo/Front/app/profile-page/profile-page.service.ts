import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../shared/usuario";


@Injectable({
    providedIn: 'root'
})

export class ProfilePageService {

    constructor(private http: HttpClient) { }

    editUser(userName: string, campo: string, nuevo: string): Observable<any> {
        return this.http.post<any>("http://127.0.0.1:8000/" + userName + "/modificar/" + campo + "/" + nuevo, '');
    }
}