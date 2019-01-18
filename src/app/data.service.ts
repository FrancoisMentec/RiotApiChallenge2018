import { Injectable } from '@angular/core';

const SUMMONER_URL = 'http://canisback.com:8080/data/summoner'
const LEAGUE_URL = 'http://canisback.com:8080/data/league'
const MASTERIES_URL = 'http://canisback.com:8080/data/masteries'
const MATCHS_URL = 'http://canisback.com:8080/data/matchlist'

function unpack(obj) {
  if (obj == null) return obj
  if (typeof obj !== 'object') return obj
  if ('content' in obj) obj = obj.content
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

  _no_leagues = {"RANKED_FLEX_TT":{"wins":0,"winrate":0,"leaguePoints":0,"rank":"","leagueName":"","games":0,"tier":"Unranked","losses":0,"image":"http://canisback.com/img/lol/unranked.png"},"RANKED_SOLO_5x5":{"wins":0,"winrate":0,"leaguePoints":0,"rank":"","leagueName":"","games":0,"tier":"Unranked","losses":0,"image":"http://canisback.com/img/lol/unranked.png"},"RANKED_FLEX_SR":{"wins":0,"winrate":0,"leaguePoints":0,"rank":"","leagueName":"","games":0,"tier":"Unranked","losses":0,"image":"http://canisback.com/img/lol/unranked.png"}}
  _leagues = null;

  _no_masteries = [];
  _masteries = null;

  _no_matchs = [];
  _matchs = null;

  constructor() {
    this.loadData()
  }

  // API

  loadData() {
    this.getData(SUMMONER_URL).then(summoner => {
      this._summoner = summoner
      console.log(this.summoner)
    }).catch(err => {
      console.error(err)
    })

    this.getData(LEAGUE_URL).then(leagues => {
      this._leagues = leagues
      console.log(this.leagues)
    }).catch(err => {
      console.error(err)
    })

    this.getData(MASTERIES_URL).then(masteries => {
      this._masteries = masteries
      console.log(this.masteries)
    }).catch(err => {
      console.error(err)
    })

    this.getData(MATCHS_URL).then(matchs => {
      this._matchs = matchs.matchlist
      console.log(this.matchs)
    }).catch(err => {
      console.error(err)
    })
  }

  get summoner() {
    if (this._summoner) return this._summoner
    else return this._no_summoner
  }

  get leagues() {
    if (this._leagues) return this._leagues
    else return this._no_leagues
  }

  get masteries() {
    if (this._masteries) return this._masteries
    else return this._no_masteries
  }

  get matchs() {
    if (this._matchs) return this._matchs
    else return this._no_matchs
  }

  getData(url): any  {
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

  // Coockie
  setCookie(name: string, value, expireDays: number = 365, path: string = '/') {
    if (typeof value == "object") value = JSON.stringify(value)
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  getCookie(name: string) {
    let cookies: Array<string> = document.cookie.split(';');
    let cookieName = `${name}=`;
    let cookie: string;

    for (let i = 0; i < cookies.length; i++) {
      cookie = cookies[i].replace(/^\s+/g, '');
      if (cookie.indexOf(cookieName) == 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null
  }
}
