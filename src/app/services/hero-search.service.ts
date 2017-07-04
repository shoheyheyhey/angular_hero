import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from '../hero';

@Injectable()
export class HeroSearchService {

  //private heroesUrl = 'http://localhost:7777/api/heroes/search';  // URL to web api
  private heroesUrl = 'http://hai-or-yes.com:7777/api/heroes/search';  // URL to web api

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`${this.heroesUrl}/${term}`)  
               .map(response => response.json() as Hero[]);
  }
}
