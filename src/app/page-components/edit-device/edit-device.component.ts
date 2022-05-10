import { Component, OnInit } from '@angular/core';
import {Device} from '../../components/my-grid/dto/device';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from '../../services/device.service';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {UserList} from './dto/user-list';
import {UserDto} from '../../dto-models/user-dto.model';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  device = {} as Device;
  loading: boolean = false;
  userList: UserList[] = [];
  deviceIdParam = "";
  form= new FormGroup({
    deviceId: new FormControl('', []),
    deviceName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    deviceValue: new FormControl('', [Validators.required]),
    currentOwner: new FormControl('', []),
    purchaseDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    lastModify: new FormControl('', []),
    lastModifier: new FormControl(this.tokenService.getUser()?.userId, [Validators.required])
  });
  purchaseDate: string = "";
  succesfully: boolean = false;


  constructor(private activedRouter: ActivatedRoute,
              private deviceService: DeviceService,
              private tokenService: TokenService,
              private authService: AuthService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.deviceIdParam = this.activedRouter.snapshot.params.device_id

    if(this.deviceIdParam)
    {
      this.deviceService.DeviceRentById(parseInt(this.deviceIdParam)).subscribe(response => {
        this.device = response[0];

        this.form = new FormGroup({
          deviceId: new FormControl(this.device.device_id, []),
          deviceName: new FormControl(this.device.device_name, [Validators.required, Validators.minLength(3)]),
          deviceValue: new FormControl(this.device.device_value, [Validators.required]),
          currentOwner: new FormControl(this.device.current_owner, [Validators.required]),
          purchaseDate: new FormControl({day: parseInt(this.device.purchase_date.substring(8,10)), month:parseInt(this.device.purchase_date.substring(5,7)), year: parseInt(this.device.purchase_date.substring(0,4))}, [Validators.required]),
          endDate: new FormControl({day: parseInt(this.device.end_date.substring(8,10)), month:parseInt(this.device.end_date.substring(5,7)), year: parseInt(this.device.end_date.substring(0,4))}, [Validators.required]),
          lastModify: new FormControl(this.device.last_modify, [Validators.required]),
          lastModifier: new FormControl(this.tokenService.getUser()?.userId, [Validators.required])
        });

        this.purchaseDate = this.device.purchase_date
      })
    }

    this.authService.userList().subscribe( response => {
      this.userList = response;
    });
  }

  onSubmit() {
    this.loading = true;
    if(this.deviceIdParam){
      this.update();
    }
    else{
      this.create();
    }
  }

  update(): void {
    this.deviceService.UpdateNewDeviceRent(this.form?.value)
      .subscribe(response => {
          this.succesfully = true;
        },
        error => {
          this.form?.get("errorMsq")?.setValue(error.error?.error)
        })
      .add(() => {
        this.loading = false;
        setTimeout(() => {  this.succesfully = false;},3000);
      });
  }


  create(): void {
    this.deviceService.CreateNewDeviceRent(this.form?.value)
      .subscribe(response => {
          this.succesfully = true;
        },
        error => {
          this.form?.get("errorMsq")?.setValue(error.error?.error)
        })
      .add(() => {
        this.loading = false;
        setTimeout(() => {  this.succesfully = false;},3000);
      });
  }

  handleChange(event: any) {
    this.device.current_owner = event?.target?.value;
  }

  handleBack() {
    this.router.navigate(["/home"]);
  }

}
