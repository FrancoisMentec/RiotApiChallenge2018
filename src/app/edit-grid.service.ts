import { Injectable } from '@angular/core';
import { GridLayoutComponent } from 'grid-layout/grid-layout.component';
import { BlockComponent } from 'block/block.component';

@Injectable({
  providedIn: 'root'
})
export class EditGridService {
  edit: boolean = false;
  gridLayout: GridLayoutComponent = null
  draggedBlock: BlockComponent = null;
  resizedBlock: BlockComponent = null;

  constructor() {
    document.addEventListener('mouseup', e => {
      this.draggedBlock = null
      this.resizedBlock = null
    })
    document.addEventListener('mousemove', e => {
      if (this.edit && this.draggedBlock || this.resizedBlock) {
        let coord = this.gridLayout.getCoord(e.clientX, e.clientY)
        let x = coord.x
        let y = coord.y
        if (this.draggedBlock != null) {
          this.draggedBlock.x = Math.min(Math.max(0, x), this.gridLayout.cols - this.draggedBlock.cols)
          this.draggedBlock.y = Math.min(Math.max(0, y), this.gridLayout.lines - this.draggedBlock.lines)
        } else if (this.resizedBlock != null) {
          this.resizedBlock.cols = Math.min(Math.max(1, x - this.resizedBlock.x + 1), this.gridLayout.cols - this.resizedBlock.x)
          this.resizedBlock.lines = Math.min(Math.max(1, y - this.resizedBlock.y + 1), this.gridLayout.lines - this.resizedBlock.y)
        }
      }
    })
  }
}
