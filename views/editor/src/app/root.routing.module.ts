
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { AppGaurd } from './gaurds/app.gaurd';

const rootRoutes:Routes=[
  {
    path:'authorized',
    component:AppComponent,
    loadChildren:'./editor-module.routing#EditorRoutingModule',
    
  },
  {
    path:'',
    loadChildren:'./app.routing#AppRoutingModule',
    canActivate:[AppGaurd]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(rootRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class RootRoutingModule { }
