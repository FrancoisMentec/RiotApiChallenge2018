import { Component, OnInit } from '@angular/core';
import { EditGridService } from '../edit-grid.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  minimized : boolean = false;

  constructor(private editGridService: EditGridService) {
  }

  ngOnInit() {
  }

  get miniClass() : String {
    return this.minimized
      ? 'mini'
      : ''
  }

  editToggleClicked(e: any) {
    this.editGridService.edit = e.toElement.checked;
  }

  toggleMinimized() {
    this.minimized = !this.minimized
  }
}
