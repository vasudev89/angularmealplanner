import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Config, { INFO_MODE } from '../../models/Config';
import MealsCollection, { getTimeSlot } from '../../models/MealsCollection';
import MealEvent, { TimeSlot } from '../../models/MealEvent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-meal-planner-cell',
  templateUrl: './meal-planner-cell.component.html',
  styleUrls: ['./meal-planner-cell.component.css']
})
export class MealPlannerCellComponent implements OnInit,OnChanges {
  @Input() config:Config;
  @Input() date:Date;
  @Input() name: String;
  @Input() events: MealsCollection;

  @Output() hidden: EventEmitter<any> = new EventEmitter<any>();

  hideme:boolean = true;
  config1:Config;

  subject: BehaviorSubject<boolean>;
  private subscription: Subscription;

  breakfastMeals:Array<MealEvent>;
  lunchMeals:Array<MealEvent>;
  dinnerMeals:Array<MealEvent>;

  DATE_INFO_MODE = INFO_MODE;

  constructor() { 
    
  }

  setHideMe(){
    this.hideme = ( this.config.noMeals || (this.breakfastMeals != undefined || this.lunchMeals != undefined || this.dinnerMeals != undefined) );
  
    this.subject = new BehaviorSubject<boolean>( this.hideme );

    this.subscription = this.subject.subscribe((newSelectedUser) => {
      console.log("newSelectedUser");
      console.log(newSelectedUser);
    });

  }

  ngOnInit() {
    const mealsByDate = this.events.mealsByDate.get(this.date.toLocaleDateString());
    if(mealsByDate) {
      this.breakfastMeals = mealsByDate.get(TimeSlot.breakfast);
      this.lunchMeals = mealsByDate.get(TimeSlot.lunch);
      this.dinnerMeals = mealsByDate.get(TimeSlot.dinner);
    }

    this.setHideMe();    

    
    //console.log( this.subject )

    

    //this.hidden.emit(false);
    //console.log(this.hidden);

  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log( changes )
  }

  doSomething(event) {
    console.log(event); // logs model value
    this.hidden.emit(event)
  }

}
