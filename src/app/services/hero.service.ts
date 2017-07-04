import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, RequestOptionsArgs, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from  "rxjs/Observable";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { Hero } from '../hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  //private heroesUrl = 'http://localhost:7777/api/heroes';  // URL to web api
  private heroesUrl = 'http://hai-or-yes.com:7777/api/heroes';  // URL to web api


  //JSONPコールバック関数名(Angular2固有値）
  CALLBACK = 'JSONP_CALLBACK';
  
  
  constructor(private http: Http, private jsonp: Jsonp) { }


  //ヒーロー一覧取得
  getHeroes(): Observable<Hero[]> {
    //リクエストパラメータセット
    let option : RequestOptions;
    option = this.setHttpGetParam(this.heroesUrl);

    //レスポンス返却
    return this.jsonp.request(this.heroesUrl, option)
      .map((response) => {
        let content;
        let obj = response.json();
        let dataObj = obj.content;
        content = {
          error: null,
          data: dataObj
        };
        console.dir(content);
        return content;

      });
               
  }

  //ヒーロー取得(ID指定)
  getHero(id: number): Observable<Hero> {
    //リクエストパラメータセット
    let option : RequestOptions;
    const url = `${this.heroesUrl}/${id}`;
    option = this.setHttpGetParam(url);
    return this.jsonp.request(url, option)
      .map((response) => {
        let content;
        let obj = response.json();
        content = {
          error: null,
          data: obj
        };
        console.dir(content);
        return content;
      });

  }

  //ヒーロー削除
  delete(id: number): Observable<void> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .map((res) => {
        console.log(res);
        return res.json();
      });

  }

  //ヒーロー作成
  create(name: string): Observable<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .map((res) => {
        console.log(res);
        return res.json();
      });
    
  }

  //ヒーロー更新
  update(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url,JSON.stringify(hero), {headers: this.headers})
      .map((res) => {
        console.log(res);
        return res.json();
      });

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  //Http(Get)通信のリクエストパラメータをセットする
  private setHttpGetParam(url: string): RequestOptions {
    let param = new URLSearchParams();
    param.set("callback", this.CALLBACK);
    let options: RequestOptionsArgs = {
      method: "get",
      url: url,
      search: param
    };
    return new RequestOptions(options);
  }

}
