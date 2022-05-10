import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {authInterceptorProviders } from './interceptors/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page-components/login/login.component';
import { HomeComponent } from './page-components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyGridComponent } from './components/my-grid/my-grid.component';
import { DeviceDetailsComponent } from './page-components/device-details/device-details.component';
import { EditDeviceComponent } from './page-components/edit-device/edit-device.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyGridComponent,
    DeviceDetailsComponent,
    EditDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
