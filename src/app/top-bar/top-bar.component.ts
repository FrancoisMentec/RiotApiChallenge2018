import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { EditGridService } from '../edit-grid.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  minimized : boolean = false;
  summoner : String;
  region : String = 'euw';

  constructor(private editGridService: EditGridService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let params = val.url.replace(/^\//, '').split('/')
        this.minimized = val.url != '/'
        if (params[0] === 'summoner') {
          this.region = params[1]
          this.summoner = params[2]
        }
      }
    })
  }

  get miniClass() : String {
    return this.minimized
      ? 'mini'
      : ''
  }

  editToggleClicked(e: any) {
    this.editGridService.edit = e.target.checked;
  }

  toggleMinimized() {
    this.minimized = !this.minimized
  }

  search() {
    this.router.navigate(['/summoner', this.region, this.summoner])
  }

  searchKeydown(e: any) {
    if (e.keyCode === 13) {
      this.search()
    }
  }

  showSettings() {
    if (this.editGridService.gridLayout) this.editGridService.gridLayout.popup.show();
  }
}
