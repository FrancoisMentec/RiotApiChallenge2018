import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match;

  constructor() { }

  ngOnInit() {
  }

  get teams(): Array<any> {
    return [this.match.blueTeam, this.match.redTeam]
  }

}
