import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import Config from '../models/Config';
import CalendarMonth, { DateCell } from '../models/Calendar';
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faArrowAltCircleUp,
  faArrowAltCircleDown
} from '@fortawesome/free-solid-svg-icons';
import MealEvent from '../models/MealEvent';
import MealsCollection from '../models/MealsCollection';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-meal-planner-view',
  templateUrl: './meal-planner-view.component.html',
  styleUrls: ['./meal-planner-view.component.css']
})
export class MealPlannerViewComponent implements OnInit, OnDestroy {
  @Input() config:Config;
  @Input() name: String;
  @Input() events: MealsCollection;
  @Input() index: Number;

  private dateRangeSubscription: Subscription;
  startDate: number;
  endDate: number;

  hidden = false;

  isWeekExpanded = false;
  isMonthExpanded = false;

  iconLeft = faArrowAltCircleLeft;
  iconRight = faArrowAltCircleRight;
  iconUp = faArrowAltCircleUp;
  iconDown = faArrowAltCircleDown

  calendar:CalendarMonth;

  public doSomething(setVal: any):void {
      this.hidden = setVal;
      console.log(setVal);
  }

  ngOnInit() {
    this.calendar = new CalendarMonth(this.config.date);
    
    this.calendar.hidden = true;

    this.dateRangeSubscription = this.config.dateRange.subscribe(range => {
      this.startDate = range.from;
      this.endDate = range.to;
    });

    console.log( this.name );
  }

  isDayInRange(day: DateCell) {
    const date = day.date.getDate();
    return (
      date >= this.startDate &&
      date <= this.endDate
    );
  }

  toggleWeek(i) {
    if(this.isWeekExpanded || this.isMonthExpanded)
      this.compressWeek();
    else
      this.expandWeek();
  }

  expandWeek() {
    const day = this.config.date.getDay();
    const date = this.config.date.getDate();
    const diff = (date - day) + 1;
    const from = diff < 1 ? 1 : diff;
    let to = diff + 6;
    if(to > this.config.totalDays)
      to = this.config.totalDays;
    this.startDate = from;
    this.endDate = to;
    this.isWeekExpanded = true;

    this.config.openMealPlans.push(this.name);

    console.log( this.config.openMealPlans )
  }

  compressWeek() {
    const date = this.config.date.getDate();
    this.startDate = date;
    this.endDate = date;
    this.isWeekExpanded = false;
    this.isMonthExpanded = false;

    this.config.openMealPlans.splice(this.config.openMealPlans.indexOf(this.name),1);

    console.log( this.config.openMealPlans )
  }

  
  toggleMonth(i) {

    console.log( this.index )

    this.events.meals

    if(this.isMonthExpanded)
      this.compressMonth();
    else
      this.expandMonth();
  }

  expandMonth() {
    this.startDate = 1;
    this.endDate = this.config.totalDays;
    this.isMonthExpanded = true;

    this.config.openMealPlans.push(this.name);
    console.log( this.config.openMealPlans )
  }

  compressMonth() {
    if(this.isWeekExpanded)
      this.expandWeek();
    else
      this.compressWeek();

    this.isMonthExpanded = false;

    this.config.openMealPlans.splice(this.config.openMealPlans.indexOf(this.name),1);

    console.log( this.config.openMealPlans )
  }

  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
  }
}
