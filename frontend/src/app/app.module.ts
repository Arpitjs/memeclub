import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AppRoutingModule } from './app.routing';
import { StreamsModule } from './modules/streams.module';
import { CookieService } from 'ngx-cookie-service';
import { MemeapiComponent } from './memeapi/memeapi.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {FacebookShareComponent } from './share/share.component'
@NgModule({
  declarations: [
    AppComponent,
    MemeapiComponent,
    FacebookShareComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    StreamsModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
