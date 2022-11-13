import { Component, OnInit } from "@angular/core";
import { Degustacion } from "../shared/degustacion";
import { Local } from "../shared/local";

@Component({
    selector: 'pm-statistics-page',
    templateUrl: './statistics-page.component.html',
    styleUrls: ['./statistics-page.component.css'],
})

export class StatisticsPageComponent implements OnInit {

    userRestaurants: Local[] = [];

    ngOnInit(): void {
        this.userRestaurants = JSON.parse(sessionStorage.getItem('restaurants')!);
    }

}