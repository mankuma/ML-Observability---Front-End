import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
        canActivate: [AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'details/:id',
        loadChildren: () => import("./details/details.module").then(m => m.DetailsModule),
        canActivate: [AuthGuard],
        pathMatch: "full"
      },

      {
        path: 'embed',
        loadChildren: () => import("./graph/graph.module").then(m => m.GraphModule),
        canActivate: [AuthGuard],
        pathMatch: "full"
      },
      {
        path: 'amanada',
        loadChildren: () => import("./amanada-home/amanada-home.module").then(m => m.AmanadaHomeModule),
        canActivate: [AuthGuard],
        pathMatch: "full"
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: "full"
  }
];

const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
