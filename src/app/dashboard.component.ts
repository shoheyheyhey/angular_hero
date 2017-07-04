import { Component, OnInit } from '@angular/core';

import { Hero }        from './hero';
import { HeroService } from './services/hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      result => this.setHeroes(result),
      error => alert('通信エラー' + error)
    );
  }

  setHeroes(result) {
    if(result.error) {
      alert('Web APIエラー' + result.message);
      return;
    }

    this.heroes = result.data.slice(1, 5);
  }
}
