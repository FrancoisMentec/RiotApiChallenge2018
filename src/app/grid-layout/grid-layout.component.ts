import { Component, ViewChild, ComponentFactoryResolver, Host } from '@angular/core';
import { EditGridService } from '../edit-grid.service';
import { Block } from '../block/block.component'

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent {
  @ViewChild('grid') grid;
  blocksWidth = 250;
  blocksHeight = 82;
  margin = 8;
  cols = 5;
  lines = 8;
  width = this.cols * this.blocksWidth + (this.cols + 1) * this.margin;
  height = this.lines * this.blocksHeight + (this.lines + 1) * this.margin;
  grid = []

  constructor(private resolver: ComponentFactoryResolver, private editGridService: EditGridService) {
  }

  get viewClass() {
    return this.editGridService.edit
      ? 'visible'
      : '';
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

  addBlock(e: any) {
    let coord = this.getCoord(e.clientX, e.clientY)
    const b = this.resolver.resolveComponentFactory(Block)
    let block = this.grid.createComponent(b)
    block.x = coord.x
    block.y = coord.y
  }
}
