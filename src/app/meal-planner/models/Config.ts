import MealsCollection from "./MealsCollection";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export enum INFO_MODE {
  day = 0,
  date,
  both
}

export default class Config {
  date = new Date();
  totalDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

  breakfast = true;
  lunch = true;
  dinner = true;

  mon = true;
  tue = true;
  wed = true;
  thu = true;
  fri = true;
  sat = true;
  sun = true;

  noMeals = true;

  openMealPlans = [];

  dateInfoMode:INFO_MODE = INFO_MODE.date;
  
  dateRange = new BehaviorSubject({
    from: this.date.getDate(),
    to: this.date.getDate()
  });
  setDateRange(dateRange: {from: number, to: number}) {
    this.dateRange.next(dateRange);
  }
}

