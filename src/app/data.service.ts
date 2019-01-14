import { Injectable } from '@angular/core';

const SUMMONER_URL = 'http://canisback.com:8080/data/summoner'
const LEAGUE_URL = 'http://canisback.com:8080/schema/league'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getSummoner(name : string)  {
    return new Promise((resolve, reject) => {
      fetch(SUMMONER_URL).then(response => {
        if (response.ok) {
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }

  getLeague() {
    return new Promise((resolve, reject) => {
      fetch(LEAGUE_URL).then(response => {
        if (response.ok) {
          resolve(response.blob())
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}
