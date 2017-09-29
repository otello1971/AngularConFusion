import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Leader } from '../shared/leader';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    //return this.http.get<Leader[]>(baseURL + 'leaders');
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    //return  this.http.get<Leader>(baseURL + 'leaders/'+ id);
    return  this.restangular.one('leaders',id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    //return this.http.get<Leader>(baseURL + 'leaders?featured=true');
    return this.restangular.all('leaders').getList({featured: true})
    .map(leaders => leaders[0]);
  }
}