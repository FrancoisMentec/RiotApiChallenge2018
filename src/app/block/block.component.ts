import { Component, OnInit, AfterViewInit, Input, ViewChild, ComponentRef, TemplateRef, ViewChildren } from '@angular/core';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { EditGridService } from '../edit-grid.service';
import { DataService } from '../data.service';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit, AfterViewInit {
  // Templates
  @ViewChild('summoner', { read: TemplateRef }) templateSummoner: TemplateRef;
  @ViewChild('champions', { read: TemplateRef }) templateChampions: TemplateRef;
  templates = ['summoner', 'champions'];
  _template = null;

  // Attributes
  parent : GridLayoutComponent;
  selfRef;
  edit : boolean = false;
  _cols : number = 1;
  _lines : number = 1;
  x : number = 0;
  y : number = 0;
  blocksWidth : number = 25;
  blocksHeight : number = 25;

  constructor(private editGridService: EditGridService, private dataService: DataService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  set template(template: string) {
    this._template = template
  }

  get template() {
    if (this._template === 'summoner') return this.templateSummoner
    if (this._template === 'champions') return this.templateChampions
    return null
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

  get gridCols() : number {
    return Math.floor(this.width / this.blocksWidth)
  }

  get gridLines() : number {
    return Math.floor(this.height / this.blocksHeight)
  }

  startDrag(e: any) {
    e.stopPropagation()
    this.editGridService.draggedBlock = this;
  }

  get editDisplay() {
    if (this.editGridService.edit && !this.edit) return "block"
    return "none"
  }

  startResize(e: any) {
    e.stopPropagation()
    this.editGridService.resizedBlock = this;
  }

  click(e) {
    //if (this.editGridService.edit) this.edit = !this.edit
  }

  delete(e: any) {
    e.stopPropagation()
    this.parent.removeBlock(this)
  }
}
