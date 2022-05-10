import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./page-components/login/login.component";
import {HomeComponent} from "./page-components/home/home.component";
import {CanActivateUser} from "./services/can.active"
import {EditDeviceComponent} from './page-components/edit-device/edit-device.component';
import {DeviceDetailsComponent} from './page-components/device-details/device-details.component';
import {IsAdmin} from './services/is.admin';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [CanActivateUser]  },
  { path: 'edit-device/:device_id', component: EditDeviceComponent, canActivate: [CanActivateUser, IsAdmin]  },
  { path: 'device-details/:device_id', component: DeviceDetailsComponent, canActivate: [CanActivateUser]  },
  { path: 'new-device', component: EditDeviceComponent, canActivate: [CanActivateUser,IsAdmin]  },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateUser]  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateUser, Permissions]
})
export class AppRoutingModule { }
