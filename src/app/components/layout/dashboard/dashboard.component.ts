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

  constructor(private deviceDetectorService : DeviceDetectorService) { 
    let desktop = this.deviceDetectorService.isDesktop();

    if(!desktop) {
      this.headerTop = ""//"fixed-top";
    }
  }

  ngOnInit(): void {
  }

  onSidebar(event: any) {
    this.toggleSideBar = event;

    if(this.toggleSideBar) {
      this.toggled = "toggled";
    } else {
      this.toggled = "";
    }
    console.log(this.toggleSideBar);
  }

}
