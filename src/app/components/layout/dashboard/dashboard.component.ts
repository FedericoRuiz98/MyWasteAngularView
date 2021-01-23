import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  toggleSideBar : boolean = true;
  toggled = "toggled";

  constructor() { }

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

  isInMobile() {
    if(window.innerWidth > 900) {
      return false;
    } else {
      return true;
    }
  }

}
