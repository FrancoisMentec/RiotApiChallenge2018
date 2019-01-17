import { Injectable } from '@angular/core';

const SUMMONER_URL = 'http://canisback.com:8080/data/summoner'
const LEAGUE_URL = 'http://canisback.com:8080/data/league'
const MASTERIES_URL = 'http://canisback.com:8080/data/masteries'

function unpack(obj) {
  if (typeof obj !== 'object') return obj
  if (typeof obj.content !== 'undefined') obj = obj.content
  for (let prop in obj) {
    obj[prop] = unpack(obj[prop])
  }
  return obj
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  _no_summoner = {"icon": "http://ddragon.canisback.com/latest/img/profileicon/0.png", "name": "none", "summonerLevel": 0}
  _summoner = null;

  _no_league = {"RANKED_FLEX_TT":{"wins":0,"winrate":0,"leaguePoints":0,"rank":"","leagueName":"","games":0,"tier":"Unranked","losses":0},"RANKED_SOLO_5x5":{"wins":0,"winrate":0,"leaguePoints":0,"rank":"","leagueName":"","games":0,"tier":"Unranked","losses":0},"RANKED_FLEX_SR":{"wins":0,"winrate":0,"leaguePoints":0,"rank":"","leagueName":"","games":0,"tier":"Unranked","losses":0}}
  _league = null;

  _no_masteries = [];
  _masteries = null;

  constructor() {
    this.loadData()
  }

  loadData() {
    this.getData(SUMMONER_URL).then(summoner => {
      this._summoner = summoner
      console.log(this.summoner)
    }).catch(err => {
      console.error(err)
    })

    this.getData(LEAGUE_URL).then(league => {
      this._league = league
      console.log(this.league)
    }).catch(err => {
      console.error(err)
    })

    this.getData(MASTERIES_URL).then(masteries => {
      this._masteries = masteries
      console.log(this.masteries)
    }).catch(err => {
      console.error(err)
    })
  }

  get summoner() {
    if (this._summoner) return this._summoner
    else return this._no_summoner
  }

  get league() {
    if (this._league) return this._league
    else return this._no_league
  }

  get masteries() {
    if (this._masteries) return this._masteries
    else return this._no_masteries
  }

  getData(url)  {
    return new Promise((resolve, reject) => {
      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(res => resolve(unpack(res))).catch(err => reject(err))
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}
