import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  @Input() league;
  @Input() name : string;
  @Input() displayIcon : boolean = true;
  @Input() displayRank : boolean = true;
  @Input() displayGames : boolean = true;
  @Input() displayWinrate : boolean = true;

  constructor() { }

  ngOnInit() {
  }

  get winrate(): number {
    if (this.league.winrate) return Math.round(this.league.winrate * 10000) / 100
    return 0
  }
}
