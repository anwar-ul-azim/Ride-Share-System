import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

// import angular google map
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

// import all component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/public/footer/footer.component';
import { HeaderComponent } from './home/public/header/header.component';
import { LoginComponent } from './home/public/login/login.component';
import { SignupComponent } from './home/public/signup/signup.component';
import { HelpComponent } from './home/public/help/help.component';
import { AboutusComponent } from './home/public/aboutus/aboutus.component';
import { MapComponent } from './home/private/map/map.component';
import { MessageComponent } from './home/private/message/message.component';
import { UserComponent } from './home/private/user/user.component';
import { LogComponent } from './home/private/log/log.component';
import { ProfileComponent } from './home/private/profile/profile.component';
import { DriverComponent } from './home/private/driver/driver.component';
import { PassengerComponent } from './home/private/passenger/passenger.component';

// import auth service and database connection model
import { AuthService } from './home/auth/auth.service';
import { ServerService } from './home/http/server.service';
import { AuthGuard } from './home/auth/auth-guard.service';

// setting up routing url
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'help', component: HelpComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'user/message', component: MessageComponent, canActivate: [AuthGuard]},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'user/log', component: LogComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HelpComponent,
    AboutusComponent,
    MapComponent,
    MessageComponent,
    UserComponent,
    LogComponent,
    ProfileComponent,
    DriverComponent,
    PassengerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),                        // routing service
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBDoNYkLZRO3rTqwdvwMPQ2_3KQCv0joAY',   // google map api key
      libraries: ['places']                                // google map search library
    }),
    AgmDirectionModule                                     // google map direction service
  ],
  providers: [AuthService, ServerService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
