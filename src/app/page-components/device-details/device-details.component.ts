import { Component, OnInit } from '@angular/core';
import {Device} from '../../components/my-grid/dto/device';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../services/device.service';
import {TokenService} from '../../services/token.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  device = {} as Device;

  constructor(private activedRouter: ActivatedRoute,
              private deviceService: DeviceService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let deviceId = this.activedRouter.snapshot.params.device_id
    this.deviceService.DeviceRentById(deviceId).subscribe(response => {
      this.device = response[0];
      console.log(this.device);
    })
  }


  handleBack() {
    this.router.navigate(["/home"]);
  }
}
