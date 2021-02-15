import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-undefined',
  templateUrl: './item-undefined.component.html',
  styleUrls: ['./item-undefined.component.scss']
})
export class ItemUndefinedComponent implements OnInit {

  @Input() condition : any = true;
  @Input() url : string = "";
  @Input() title : string = "";
  @Input() subTitle : string = "";
  @Input() btnMsg : string = "";
  @Input() style : string = "waste";

  constructor() { }

  ngOnInit(): void {
  }


}
