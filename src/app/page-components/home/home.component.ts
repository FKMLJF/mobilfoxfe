import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loaded = false;

  constructor(private packageService: DeviceService) {
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.loaded = false;

  }
}
