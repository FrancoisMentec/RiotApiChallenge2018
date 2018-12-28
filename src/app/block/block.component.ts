import { Component, OnInit, Input, ViewChild, ComponentRef } from '@angular/core';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { EditGridService } from '../edit-grid.service';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  parent: GridLayoutComponent;
  @Input() cols : number = 1;
  @Input() lines : number = 1;
  @Input() x : Integer = 0;
  @Input() y : Integer = 0;

  constructor(private editGridService: EditGridService) {
  }

  ngOnInit() {
  }

  get parent() {
    return this.editGridService.gridLayout
  }

  set cols(v: any) {
    this._cols = typeof v == 'number'
      ? v
      : parseInt(v)
  }

  get cols(): number {
    return this._cols
  }

  set lines(v: any) {
    this._lines = typeof v == 'number'
      ? v
      : parseInt(v)
  }

  get lines(): number {
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
    this.editGridService.draggedBlock = this;
  }

  startResize(e: any) {
    e.stopPropagation()
    this.editGridService.resizedBlock = this;
  }

  delete(e: any) {
    //console.log(this)
    /*let index = this.parent.blocksContainer.indexOf(this)
    console.log(this)
    console.log(index)
    this.parent.blocksContainer.remove(index)*/
    /*console.log(this.componentRef)
    let index = this.parent.blocksContainer.indexOf(this.componentRef)
    console.log(index)
    this.parent.blocksContainer.remove(index)*/
    this.parent.removeBlock(this)
  }
}
