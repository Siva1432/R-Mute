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
import { HttpService } from './services/auth.service';

const secureRoutes: Routes = [
  {
    path:'',
    component:EditorRootComponent,
    children:[
              { path: 'editor',
              canActivate:[AuthGaurd],
              children:[
                {path:':id',
                component: EditorComponent}
              ]
            },
            {
                path:'dashboard/:id',
                component:DashboardComponent,
                canActivate:[AuthGaurd]
            },
          
    ]
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
        HttpService
    ],
    exports: [
      RouterModule
    ]
  })
  export class EditorRoutingModule {}