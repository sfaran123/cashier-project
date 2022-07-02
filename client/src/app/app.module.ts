import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {TranslateModule} from 'src/app/shared/_pipes/translation/translate.module';
import {AppRoutingModule} from './app-routing.module';
import {HeaderModule} from 'src/app/layout/header/header.module';

import {AppComponent} from './app.component';

import {HelpersService} from 'src/app/shared/_services/generic/helpers.service';
import {NotificationService} from 'src/app/shared/_services/generic/notification.service';

import {LoginComponent} from './public/auth/login/login.component';
import {SignupComponent} from './public/auth/signup/signup.component';
import {AuthInterceptor} from './public/auth/auth-interceptor';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

import { TranslatePipe } from 'src/app/shared/_pipes/translation/translate.pipe';

@NgModule({
  declarations: [AppComponent,
    LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    TranslatePipe,
    HelpersService,
    NotificationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AppModule {
}
