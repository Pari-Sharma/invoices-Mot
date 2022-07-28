import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
// Import routing module
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
} from './containers';

import {
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  FooterModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule,
  CardModule,
  TableModule,
  CardComponent,
  ModalModule,
  FormModule
  
} from '@coreui/angular-pro';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './views/customer/customer.component';
import { InvoicesModule } from './views/invoices/invoices.module';
import { MainFileUploadComponent } from './views/main-file-upload/main-file-upload.component';
import { AllApiCallsService } from './all-api-calls.service';
import { ItemsComponent } from './views/items/items.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, CustomerComponent, MainFileUploadComponent, ItemsComponent,LoginComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BreadcrumbModule,
    FooterModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    CardModule,
    NavModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    SidebarModule,
    BadgeModule,
    InvoicesModule,
    ModalModule,
    FormModule,
    AuthModule.forRoot({
      domain: 'login-mot1.us.auth0.com',
      clientId: 'ClNJpqQ7tFKfKoY6ki3v0nnKMFgPgR2B'
    }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    Title,AllApiCallsService,CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
