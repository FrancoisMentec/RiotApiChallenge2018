import { Component, OnInit } from '@angular/core';
import { EditGridService } from '../edit-grid.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  editGridService: EditGridService;

  constructor(private editGridService: EditGridService) {
    this.editGridService = editGridService;
  }

  ngOnInit() {
  }

  editToggleClicked(e: any) {
    this.editGridService.edit = e.toElement.checked;
  }
}
