
import { AuthComponent } from './components/auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {
      path: 'signup',
      component: AuthComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },{
      path:'',
      component:HomeComponent
    },
    {
      path:'authorized',
      loadChildren:'./editor-module.routing#EditorRoutingModule'
    },
    {
      path:'**',
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
