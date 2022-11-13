import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { RecoveryPageComponent } from "./recovery-page/recovery-page.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { StatisticsPageComponent } from "./statistics-page/statistics-page.component";
import { TastingsPageComponent } from "./tastings-page/tastings-page.component";

const appRoutes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'registration', component: RegistrationPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'recovery', component: RecoveryPageComponent },
    { path: 'statistics', component: StatisticsPageComponent },
    { path: 'tastings', component: TastingsPageComponent},
    { path: '', component: LoginPageComponent }
];
export const routing = RouterModule.forRoot(appRoutes);