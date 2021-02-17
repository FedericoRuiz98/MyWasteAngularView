import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  toggleSideBar : boolean = false;
  toggled = "";
  headerTop : string = "";
  desktop : boolean = true;

  constructor(private deviceDetectorService : DeviceDetectorService) { 
    this.desktop = this.deviceDetectorService.isDesktop();

    if(!this.desktop) {
      this.headerTop = ""//"fixed-top";
    }
  }

  ngOnInit(): void {
  }

  onSidebar(event: any) {
    this.toggleSideBar = event;

    if(this.toggleSideBar) {
      if(this.desktop) {
        this.toggled = "toggled";
      } else {
        this.toggled = "toggled-mobile";
      }      
    } else {
      this.toggled = "";
    }
    console.log(this.toggleSideBar);
  }

}
