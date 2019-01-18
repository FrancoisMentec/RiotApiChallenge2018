import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent implements OnInit {

  @Input() label: string;
  @Input() value: any = '';
  @Input() min: number = null;
  @Input() type: string = 'string';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  notEmpty = '';

  constructor() { }

  ngOnInit() {
    this.notEmpty = typeof this.value != 'string' || this.value.length > 0
      ? 'not-empty'
      : ''
  }

  emit() {
    this.notEmpty = typeof this.value != 'string' || this.value.length > 0
      ? 'not-empty'
      : ''
    if (this.type === 'number') {
      let val = parseFloat(this.value)
      if (this.value.length == 0) val = this.min != null ? this.min : 0
      if (this.min != null) val = Math.max(this.min, val)
      this.valueChange.emit(val)
    }
    else this.valueChange.emit(this.value)
  }

  /*get notEmpty() {
    console.log(typeof this.value)
    return typeof this.value != 'string' || this.value.length > 0
      ? 'not-empty'
      : ''
  }*/

}
