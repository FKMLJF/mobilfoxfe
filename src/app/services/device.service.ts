import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Device} from '../components/my-grid/dto/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) {}

  DeviceRentList(): Observable<any> {
    return this.http.get(environment.api_endpoint + 'api/device/list');
  }

  DeviceRentById(deviceId: number): Observable<any> {
    return this.http.get(environment.api_endpoint + `api/device?device_id=${deviceId}`);
  }

  CreateNewDeviceRent(device: Device): Observable<any> {
    return this.http.post(environment.api_endpoint + `api/device/create`, device);
  }

  UpdateNewDeviceRent(device: Device): Observable<any> {
    return this.http.put(environment.api_endpoint + `api/device/update`, device);
  }

  DeleteNewDeviceRent(deviceId: number): Observable<any> {
    return this.http.delete(environment.api_endpoint + `api/device/delete?device_id=${deviceId}`, {});
  }



}
