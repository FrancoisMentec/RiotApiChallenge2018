import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {

  @Input() champion;

  constructor() { }

  ngOnInit() {
  }

}
