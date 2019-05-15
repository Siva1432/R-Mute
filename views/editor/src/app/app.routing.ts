import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
const appRoutes: Routes = [
    { path: 'editor',
      component: AppComponent
    },
    {
      path: 'signup',
      component: AuthComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },{
      path:'home',
      component:HomeComponent
    }
  ];
  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}
