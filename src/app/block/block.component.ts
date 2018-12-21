import { Component, OnInit, Host, Input } from '@angular/core';
import { GridLayoutComponent } from '../grid-layout/grid-layout.component';
import { EditGridService } from '../edit-grid.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  parent : GridLayoutComponent;
  editGridService: EditGridService;
  @Input() cols : Integer = 1;
  @Input() lines : Integer = 1;
  @Input() x : Integer;
  @Input() y : Integer;
  xClick: Integer;
  yClick: Integer;

  constructor(@Host() parent: GridLayoutComponent, private editGridService: EditGridService) {
    this.parent = parent;
    this.editGridService = editGridService;
  }

  ngOnInit() {
  }

  get margin(): Integer {
    return this.parent.margin / 2;
  }

  get width(): Integer {
    return this.cols * this.parent.blocksWidth + (this.cols - 1) * this.parent.margin;
  }

  get height(): Integer {
    return this.lines * this.parent.blocksHeight + (this.lines - 1) * this.parent.margin;
  }

  get left(): Integer {
    return this.x * (this.parent.blocksWidth + this.parent.margin) + this.margin;
  }

  get top(): Integer {
    return this.y * (this.parent.blocksHeight + this.parent.margin);
  }

  mouseDown(e: any) {
    this.xClick = e.offsetX;
    this.yClick = e.offsetY;
    this.editGridService.draggedBlock = this;
    /*console.log(e)
    document.onmousemove = e => {

    }*/
  }
}
