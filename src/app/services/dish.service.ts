import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Dish} from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes() { return Observable.of(DISHES); }
  
  getDish(id: number | string) {
    return this.getDishes()
      // (+) before `id` turns the string into a number
      .map(dishes => dishes.find(dish => dish.id === +id));
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }

}
