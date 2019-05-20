
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';

const rootRoutes:Routes=[
  {
    path:'authorized',
    component:AppComponent,
    loadChildren:'./editor-module.routing#EditorRoutingModule'
  },
  {
    path:'',
    loadChildren:'./app.routing#AppRoutingModule'

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
