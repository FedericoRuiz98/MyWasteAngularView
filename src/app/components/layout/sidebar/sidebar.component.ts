import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RouteInfo } from 'src/app/models/Routes/RouteInfo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent implements OnInit {

  @Output() sidebarShow = new EventEmitter<boolean>();
  flag : boolean = false;
  desktop: boolean = true;

  constructor(private deviceDetectorService : DeviceDetectorService) { 
    this.desktop = this.deviceDetectorService.isDesktop();
  }

  ngOnInit(): void { 
    
  }

  toggleSideBar() {
    this.flag = !this.flag;
    this.sidebarShow.emit(this.flag);
  }

}
