import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { visibility, flyInOut, expand } from '../animations/app.animation';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [ flyInOut(), visibility(), expand() ]
})

export class DishdetailComponent implements OnInit {
  
    dish: Dish;
    dishcopy = null;  //used by Restangular
    dishIds: number[];
    prev: number;
    next: number;

    commentForm: FormGroup;
    comment: Comment;

    errMess: string;  //in case of error msg from DB

    visibility = 'shown'; //for animations

    formErrors = {
      'author': '',
      'comment': ''
    };

    validationMessages = {
      'author': {
        'required': 'Author Name is required.',
        'minlength': 'Author Name must be at least 2 characters long.'
      },
      'comment': {
        'required': 'Comment is required.'
      },
    };
  
    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL) { }
  
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errMess = `An error occurred: ${err.error.message}`;
          } else {
            this.errMess =`Backend returned code ${err.status} body was: ${err.error}`;
          }
        }
      );
      
      this.createForm();
    }
  
    goBack(): void {
      this.location.back();
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }

    createForm(): void {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2)]],
        rating: 5,
        comment: ['', [Validators.required]]
      });

      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;

      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }

      this.comment = null;  
      if (this.commentForm.valid){
        this.comment = this.commentForm.value;
      } 

      
    }

    onSubmit() {
      this.comment.date = new Date()
        .toISOString();
      this.comment = this.commentForm.value;
      this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
        .subscribe(dish => { this.dish = dish; console.log(this.dish); });
      console.log(this.comment);
      this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
      });
      this.comment = null;
    }

  }
