import { Injectable } from '@angular/core';
import { BlockComponent } from '../edit-grid.service';

@Injectable({
  providedIn: 'root'
})
export class EditGridService {
  edit: boolean = false;
  draggedBlock: BlockComponent = null;
  resizedBlock: BlockComponent = null;

  constructor() {
    document.addEventListener('mouseup', e => {
      this.draggedBlock = null
      this.resizedBlock = null
    })
    document.addEventListener('mousemove', e => {
      if (this.edit && this.draggedBlock || this.resizedBlock) {
        let rect = this.layout.grid.nativeElement.getBoundingClientRect()
        let x = Math.floor((e.clientX - rect.x) / (this.layout.blocksWidth + this.layout.margin))
        let y = Math.floor((e.clientY - rect.y) / (this.layout.blocksHeight + this.layout.margin))
        if (this.draggedBlock != null) {
          this.draggedBlock.x = Math.min(Math.max(0, x), this.layout.cols - this.draggedBlock.cols)
          this.draggedBlock.y = Math.min(Math.max(0, y), this.layout.lines - this.draggedBlock.lines)
        } else if (this.resizedBlock != null) {
          this.resizedBlock.cols = Math.max(1, x - this.resizedBlock.x + 1)
          this.resizedBlock.lines = Math.max(1, y - this.resizedBlock.y + 1)
        }
      }
    })
  }

  get layout() {
    if (this.draggedBlock) return this.draggedBlock.parent
    if (this.resizedBlock) return this.resizedBlock.parent
    return null
  }
}
