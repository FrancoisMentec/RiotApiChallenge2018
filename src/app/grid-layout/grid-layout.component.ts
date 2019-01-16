import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnInit, Input } from '@angular/core';
import { EditGridService } from '../edit-grid.service';
import { BlockComponent } from '../block/block.component'
import { WelcomeComponent } from '../welcome/welcome.component'

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {
  @ViewChild('grid') grid;
  @ViewChild('grid', { read: ViewContainerRef }) blocksContainer: ViewContainerRef;
  @Input() blocksWidth = 250;
  @Input() blocksHeight = 100;
  @Input() margin = 8;
  @Input() cols = 5;
  @Input() lines = 8;
  //width = this.cols * this.blocksWidth + (this.cols + 1) * this.margin;
  //height = this.lines * this.blocksHeight + (this.lines + 1) * this.margin;
  blocks = [];

  constructor(private resolver: ComponentFactoryResolver, private editGridService: EditGridService) {
  }

  ngOnInit() {
    this.addBlock(0, 0, 1, 1, 'summoner')
    this.addBlock(0, 1, 1, 3, 'champions')
    this.addBlock(1, 0, 1, 2)
    /*this.addBlock(0,0)
    this.addBlock(1,0,3,3)
    this.addBlock(4,0,1,3)
    this.addBlock(0,1,1,2)*/
  }

  get viewClass() {
    return this.editGridService.edit
      ? 'visible'
      : '';
  }

  get width() : number {
    return this.cols * this.blocksWidth + (this.cols + 1) * this.margin;
  }

  get height() : number {
    return this.lines * this.blocksHeight + (this.lines + 1) * this.margin;
  }

  /**
   * Return the block coordinates corresponding to the pixel coordinates (x, y)
   * @param {number} x - x coordinate in pixel (example: event.clientX)
   * @param {number} y - y coordinate in pixel (example: event.clientY)
   * @return {object} {x: number, y: number} - coordinates of the block at the given position
   */
  getCoord(x: number, y: number) {
    let rect = this.grid.nativeElement.getBoundingClientRect()
    return {
      x: Math.floor((x - rect.x) / (this.blocksWidth + this.margin)),
      y: Math.floor((y - rect.y) / (this.blocksHeight + this.margin))
    }
  }

  arr(n, v=0) {
    return Array(n).fill(v)
  }

  /**
   * add a new block to the grid
   * @param x_or_e - can either be the x coordinate on the grid or an user event like a click
   */
  addBlock(x_or_e, y=0, cols=1, lines=1, template=null) {
    let x = null
    if (x_or_e instanceof MouseEvent) {
      let coord = this.getCoord(x_or_e.clientX, x_or_e.clientY)
      x = coord.x
      y = coord.y
    } else {
      x = x_or_e
    }

    let blockFactory = this.resolver.resolveComponentFactory(BlockComponent)
    let blockRef = this.blocksContainer.createComponent(blockFactory)
    let block = blockRef.instance
    block.parent = this
    block.selfRef = blockRef
    block.x = x
    block.y = y
    block.cols = cols
    block.lines = lines
    if (template) block.template = template
    this.blocksContainer.insert(blockRef.hostView)
  }

  removeBlock(block: BlockComponent) {
    let index = this.blocksContainer.indexOf(block.selfRef)
    this.blocksContainer.remove(index)
  }
}
