import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendResetComponent } from './send-reset/send-reset.component';





import { AuthGuard } from './auth.guard';
import { RoleGuardService } from './role-guard-service.guard';

 
const appRoutes: Routes = [
  
   
    {
      path: 'home', component: HomeComponent
    }

,
        {
          path: 'createpost', component: CreatePostComponent, canActivate: [AuthGuard]
        },
        { path: 'posts/:id', component: PostComponent }
    
  ,
        { path: 'admin', component: AdminComponent, canActivate: [RoleGuardService] }
  ,
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
  ,
        { path: 'login/:id', component: LoginComponent },
        { path: 'reset', component: SendResetComponent },
        { path: 'reset/:id', component: ResetPasswordComponent },

    { path: 'register', component: RegisterComponent },
 
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];
 
export const routing = RouterModule.forRoot(appRoutes);
