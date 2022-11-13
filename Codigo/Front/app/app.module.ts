import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast'
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RecoveryPageComponent } from './recovery-page/recovery-page.component';
import { HttpClientModule } from "@angular/common/http"
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { TastingsPageComponent } from './tastings-page/tastings-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HomePageComponent,
    ProfilePageComponent,
    RecoveryPageComponent,
    StatisticsPageComponent,
    TastingsPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    CalendarModule,
    TableModule,
    BrowserAnimationsModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
