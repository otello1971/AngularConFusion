import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [ flyInOut(), expand() ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
        .subscribe(dish => this.dish = dish,
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.dishErrMess = `An error occurred: ${err.error.message}`;
            } else {
              this.dishErrMess =`Backend returned code ${err.status} body was: ${err.error}`;
            }
          }
        );
    this.promotionservice.getFeaturedPromotion()
        .subscribe(promotion => this.promotion = promotion[0],
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.promotionErrMess = `An error occurred: ${err.error.message}`;
            } else {
              this.promotionErrMess =`Backend returned code ${err.status} body was: ${err.error}`;
            }
          }
        );
    this.leaderservice.getFeaturedLeader()
        .subscribe(leader => this.leader = leader[0],
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.leaderErrMess = `An error occurred: ${err.error.message}`;
            } else {
              this.leaderErrMess =`Backend returned code ${err.status} body was: ${err.error}`;
            }
          }
        );
  }

}