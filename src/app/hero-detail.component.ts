import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Hero} from './hero';
import {HeroService} from './services/hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(
          result => this.setHero(result));
  }

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(
        result => {
          this.goBack();
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

  setHero(result) {
    if(result.error) {
      alert('Web APIエラー' + result.message);
      return;
    }

    this.hero = result.data;

  }
}
