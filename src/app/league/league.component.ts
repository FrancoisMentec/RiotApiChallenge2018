import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  @Input() league;

  constructor() { }

  ngOnInit() {
  }

  get winrate(): number {
    if (this.league.winrate) return Math.round(this.league.winrate * 10000) / 100
    return 0
  }
}
