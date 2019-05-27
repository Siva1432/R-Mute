import { EditorComponent } from './components/editor/editor.component';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SocketService } from './services/socket.service';
import { TextService } from './services/text.service';
import { OperationHelpersService } from './services/operation-helpers.service';
import { HttpInterceptorService } from './gaurds/http-interseptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGaurd } from './gaurds/canActivate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaurdService } from './services/gaurd.service';
import { EditorRootComponent } from './components/editor-root/editor-root.component';
import { CommonModule } from '@angular/common';
import { Paths } from './services/paths';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { NewProjectFormGaurd } from './gaurds/deactivate.gaurd';
import { ProjectService } from './services/project.service';

const secureRoutes: Routes = [
  {
    path:':id',
    component:EditorRootComponent,
    resolve:{user:UserResolver},
    canActivate:[AuthGaurd],
    children:[ 
              {
                path:'createproject',
                component:NewProjectFormComponent,
                canActivate:[AuthGaurd],
                canDeactivate:[NewProjectFormGaurd]
              },
              { path: 'editor',
              canActivate:[AuthGaurd],
              component: EditorComponent,
              children:[
                {path:':id',
                }
              ]
            },
            {
                path:'',
                component:DashboardComponent,
                canActivate:[AuthGaurd]
                
            },
            {
              path:'**',
              redirectTo:'./'
            }
          
    ],
  },
  {
    path:'**',
    redirectTo:':id'
    
  }
   
  ];
  @NgModule({
    imports: [
      RouterModule.forChild(secureRoutes),
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    declarations:[
        EditorComponent,
        DashboardComponent,
        EditorRootComponent,
        NewProjectFormComponent
        
    ],
    providers:[
        SocketService,
        TextService,
        OperationHelpersService,
        HttpInterceptorService,
        {provide:HTTP_INTERCEPTORS,
        useClass:HttpInterceptorService,
        multi: true},
        AuthGaurd,
        GaurdService,
        Paths,
        CookieService,
        UserService,
        UserResolver,
        NewProjectFormGaurd,
        ProjectService
    ],
    exports: [
      RouterModule
    ]
  })
  export class EditorRoutingModule {}