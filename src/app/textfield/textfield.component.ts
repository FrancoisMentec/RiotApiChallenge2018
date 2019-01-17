import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent implements OnInit {

  @Input() label: string;
  @Input() value = '';
  @Input() type: string = 'string';
  @Output() valueChange: EventEmitter = new EventEmitter<>();

  constructor() { }

  ngOnInit() {
  }

  /*get value() {
    return this._value
  }

  set value(value) {
    this._value = value
    this.valueChange.emit(this.value)
  }

  setValue(value) {
    this._value = value;
  }*/

  emit() {
    if (this.type === 'number') this.valueChange.emit(parseFloat(this.value))
    else this.valueChange.emit(this.value)
  }

  get notEmpty() {
    return this.value && (typeof this.value != 'string' || this.value.length > 0)
      ? 'not-empty'
      : ''
  }

}
