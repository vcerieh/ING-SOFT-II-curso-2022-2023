import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Degustacion } from "../shared/degustacion";
import { Galardon } from "../shared/galardones";
import { Usuario } from "../shared/usuario";


@Injectable({
    providedIn: 'root'
})

export class HomePageService {
    
    constructor(
        private http: HttpClient
    ){}

    getTastingsByUser(userName: string) : Observable<any>{
        return this.http.get<any>("http://127.0.0.1:8000/" + userName + "/comidas_favoritas");
    }

    getAwardsByUser(userName: string) : Observable<any>{
        return this.http.get<any>("http://127.0.0.1:8000/" + userName +"/estadisticas");
    }
}