import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'md-select',
  templateUrl: './md-select.component.html',
  styleUrls: ['./md-select.component.css']
})
export class MdSelectComponent implements OnInit {

  @Input() value: any;
  @Input() values: Array<any> = [];
  @Input() label: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  notEmpty: string = '';

  constructor() { }

  ngOnInit() {
    this.notEmpty = this.value
      ? 'not-empty'
      : ''
  }

  emit() {
    this.notEmpty = 'not-empty'
    this.valueChange.emit(this.value)
  }
}
