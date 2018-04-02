import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  



import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { RoleGuardService } from './role-guard-service.guard';
import { MomentModule } from 'angular2-moment';


import { AuthGuard } from './auth.guard';
import { AlertService } from './alert.service';
import { HomeService } from './home.service';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { MenuComponent } from './menu/menu.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendResetComponent } from './send-reset/send-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    MenuComponent,
    CreatePostComponent,
    PostComponent,
    AdminComponent,
    ProfileComponent,
    ResetPasswordComponent,
    SendResetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    routing,
    MomentModule
  ],
  providers: [
    AuthGuard,
    RoleGuardService,
    AlertService,
    AuthenticationService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
