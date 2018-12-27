import { Component, OnInit, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { EditGridService } from '../edit-grid.service';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('grid') grid;
  blocksWidth = 250;
  blocksHeight = 82;
  margin = 8;
  cols = 5;
  lines = 8;
  width = this.cols * this.blocksWidth + (this.cols + 1) * this.margin;
  height = this.lines * this.blocksHeight + (this.lines + 1) * this.margin;
  grid = []

  constructor(private editGridService: EditGridService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  get viewOpacity() {
    return this.editGridService.edit
      ? 0.6
      : 0;
  }

  arr(n, v=0) {
    return Array(n).fill(v)
  }
}
