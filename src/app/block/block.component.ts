import { Component, OnInit, Input, ViewChild, ComponentRef } from '@angular/core';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { EditGridService } from '../edit-grid.service';
import { DataService } from '../data.service';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  parent: GridLayoutComponent;
  selfRef;
  _cols : number = 1;
  _lines : number = 1;
  x : number = 0;
  y : number = 0;

  constructor(private editGridService: EditGridService, private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getSummoner('Saig').then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  set cols(v) {
    this._cols = typeof v == 'number'
      ? v
      : parseInt(v)
  }

  get cols() {
    return this._cols
  }

  set lines(v) {
    this._lines = typeof v == 'number'
      ? v
      : parseInt(v)
  }

  get lines() {
    return this._lines
  }

  get margin(): number {
    return this.parent.margin / 2;
  }

  get width(): number {
    return this.cols * this.parent.blocksWidth + (this.cols - 1) * this.parent.margin;
  }

  get height(): number {
    return this.lines * this.parent.blocksHeight + (this.lines - 1) * this.parent.margin;
  }

  get left(): number {
    return this.x * (this.parent.blocksWidth + this.parent.margin) + this.margin;
  }

  get top(): number {
    return this.y * (this.parent.blocksHeight + this.parent.margin);
  }

  startDrag(e: any) {
    e.stopPropagation()
    this.editGridService.draggedBlock = this;
  }

  startResize(e: any) {
    e.stopPropagation()
    this.editGridService.resizedBlock = this;
  }

  delete(e: any) {
    e.stopPropagation()
    this.parent.removeBlock(this)
  }
}
