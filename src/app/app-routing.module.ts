import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MsalGuard } from '@azure/msal-angular';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
        canActivate: [MsalGuard, AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'details/:id',
        loadChildren: () => import("./details/details.module").then(m => m.DetailsModule),
        canActivate: [MsalGuard, AuthGuard],
        pathMatch: "full"
      },

      {
        path: 'embed',
        loadChildren: () => import("./graph/graph.module").then(m => m.GraphModule),
        canActivate: [MsalGuard, AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'amanada',
        loadChildren: () => import("./amanada-home/amanada-home.module").then(m => m.AmanadaHomeModule),
        canActivate: [MsalGuard, AuthGuard],
        pathMatch: "full"
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
