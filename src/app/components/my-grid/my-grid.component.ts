import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from './dto/device';
import {TokenService} from '../../services/token.service';
import {UserDto} from '../../dto-models/user-dto.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})
export class MyGridComponent implements OnInit {

  DeviceList: Device[] = [];
  userInfo: UserDto | null;

  constructor(private deviceService: DeviceService,
              private tokenService: TokenService,
              private router: Router
  ) {
    this.userInfo = tokenService.getUser();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
      this.deviceService.DeviceRentList().subscribe(response => {
        this.DeviceList = response;
      })
  }

  isAdmin(): boolean{
    return this.userInfo?.role === 1;
  }

  handleDelete(device_id: number) {
      this.deviceService.DeleteNewDeviceRent(device_id).subscribe(response => {
        this.loadData();
      })
  }

  handleDetails(device_id: number) {
      this.router.navigate([`/device-details/${device_id}`])
  }

  handleEdit(device_id: number) {
    this.router.navigate([`/edit-device/${device_id}`])
  }

  handleNewDevice() {
    this.router.navigate(['/new-device'])
  }
}
