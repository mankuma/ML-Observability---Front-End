import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TableauModule } from 'ngx-tableau';
import { NgSelectModule } from '@ng-select/ng-select';
import { MsalModule } from '@azure/msal-angular';
import { environment } from './environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopNavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TableauModule,
    NgSelectModule,
    // MsalModule.forRoot({
    //   auth: {
    //     clientId: environment.clientId,
    //     authority: "https://login.microsoftonline.com" + "/" + environment.tenantId,
    //     navigateToLoginRequestUrl: true,
    //     redirectUri: '',
    //   },
    //   cache: {
    //     cacheLocation: 'localStorage',
    //     storeAuthStateInCookie: isIE, // set to true for IE 11
    //   }
    // }, null, null)
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
