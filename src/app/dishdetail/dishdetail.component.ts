import 'rxjs/add/operator/switchMap';
import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


import { Dish } from '../shared/dish';
import { DishService }  from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish$: Observable<Dish>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DishService
  ) { }

  ngOnInit() {
    this.dish$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getDish(params.get('id')));
  }

}
