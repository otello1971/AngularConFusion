import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  dishes$: Observable<Dish[]>;
  
  private selectedId: number;

  constructor(
        private route: ActivatedRoute,
        private dishService:DishService
  ) { }

  ngOnInit() {
    this.dishes$ = this.route.paramMap
     .switchMap((params: ParamMap) => {
       // (+) before `params.get()` turns the string into a number
       //this.selectedId = +params.get('id');
       return this.dishService.getDishes();
    });
  }

}
