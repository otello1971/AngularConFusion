import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Promotion } from '../shared/promotion';
import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    //return this.http.get<Promotion[]>(baseURL + 'promotions');
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    //return  this.http.get<Promotion>(baseURL + 'promotions/'+ id);
    return  this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return this.http.get<Promotion>(baseURL + 'promotions?featured=true');
    return this.restangular.all('promotions').getList({featured: true})
    .map(promotions => promotions[0]);
  }
}