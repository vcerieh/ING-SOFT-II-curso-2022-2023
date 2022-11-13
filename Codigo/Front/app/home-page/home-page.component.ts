import { Component, OnInit } from "@angular/core";
import { Degustacion } from "../shared/degustacion";
import { Galardon } from "../shared/galardones";
import { Local } from "../shared/local";
import { Usuario } from "../shared/usuario";
import { HomePageService } from "./home-page.service";


@Component({
    selector: 'pm-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent implements OnInit {

    searchInfo: string = '';
    user: Usuario = new Usuario();
    tastings: Degustacion[] = [];
    fTastings: Degustacion[] = [];
    awards: Galardon[] = [];
    restaurants: Local[] = [];
    nTastings: number = 0;
    nRestaurants: number = 0;

    constructor(
        private homePageService: HomePageService
    ) { }

    ngOnInit() {
        //let name = sessionStorage.getItem('userName')!;
        this.user = JSON.parse(sessionStorage.getItem('user')!);

        const userTastings = this.homePageService.getTastingsByUser(this.user.userName).subscribe(data => {
            let aux = data.COMIDAS_FAVORITAS;
            if (!!aux[0]) {
                aux.forEach((c: string[]) => {
                    let degust = new Degustacion();
                    degust.name = c[1];
                    degust.rating = +c[2];
                    degust.foodType = c[3];
                    degust.picture = c[4];
                    degust.country = c[5];
                    if (!!c[6]) {
                        degust.addedBy = c[6];
                    }
                    if (!!c[7]) {
                        degust.local = c[7];
                    }
                    this.tastings.push(degust);
                });
                for (let i = 0; i<3; i++){
                    let degust = new Degustacion();
                    degust.name = aux[i][1];
                    degust.rating = +aux[i][2];
                    degust.foodType = aux[i][3];
                    degust.picture = aux[i][4];
                    degust.country = aux[i][5];
                    if (!!aux[i][6]) {
                        degust.addedBy = aux[i][6];
                    }
                    if (!!aux[i][7]) {
                        degust.local = aux[i][7];
                    }
                    this.fTastings.push(degust);
                }
                sessionStorage.setItem('tastings', JSON.stringify(this.tastings));
                const userAwards = this.homePageService.getAwardsByUser(this.user.userName).subscribe(data => {
                    let aux = data.ESTADISTICAS;
                    let aux2: string[] = aux[1];
                    this.nTastings = aux[0];
                    this.nRestaurants = aux2.length;
                    aux2.forEach(element => {
                        let res = new Local();
                        res.name = element[0];
                        res.coordinates = element[1];
                        res.address = element[2];
                        if (!!element[3]){
                            res.addedBy = element[3];
                        }
                        res.date = element[4];
                        this.restaurants.push(res);
                    });
                    sessionStorage.setItem('restaurants', JSON.stringify(this.restaurants));
                });
            }
        });
        // const userAwards = this.homePageService.getAwardsByUser(this.user.userName).subscribe(data => {
        //     let aux = data.ESTADISTICAS;
        //     let aux2: string[] = aux[1];
        //     this.nTastings = aux[0];
        //     this.nRestaurants = aux2.length;
        //     aux2.forEach(element => {
        //         let res = new Local();
        //         res.name = element[0];
        //         res.coordinates = element[1];
        //         res.address = element[2];
        //         if (!!element[3]){
        //             res.addedBy = element[3];
        //         }
        //         res.date = element[4];
        //         this.restaurants.push(res);
        //     });
        //     sessionStorage.setItem('restaurants', JSON.stringify(this.restaurants));
        // });
    }

    search() { }
}