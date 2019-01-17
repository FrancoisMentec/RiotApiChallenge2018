import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() visible : boolean = false;
  @Input() title : string = '';

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

}
