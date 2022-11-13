import { Component, OnInit } from "@angular/core";
import { Degustacion } from "../shared/degustacion";

@Component({
    selector: 'pm-statistics-page',
    templateUrl: './tastings-page.component.html',
    styleUrls: ['./tastings-page.component.css'],
})

export class TastingsPageComponent implements OnInit {

    userTastings: Degustacion[] = [];

    ngOnInit(): void {
        this.userTastings = JSON.parse(sessionStorage.getItem('tastings')!);
    }

}