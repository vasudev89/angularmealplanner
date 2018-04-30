import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mealplans = [
    {
      name : 'Breakfast Delight',
      isMonthExpanded: false,
      isWeekExpanded: false,
      events : [
        {id: 1, name: 'Meal 1', date: new Date('1 April 2018'),img:'images/img1.png'},
        {id: 2, name: 'Meal 2', date: new Date('1 April 2018 13:00'),img:'images/img2.png'},
        {id: 3, name: 'Meal 3', date: new Date('1 April 2018 19:00'),img:'images/img3.png'},
        {id: 4, name: 'Pizza', date: new Date(new Date().setHours(1)),img:'images/img1.png'},
        {id: 5, name: 'Porridge', date: new Date(new Date().setHours(13)),img:'images/img2.png'},
        {id: 6, name: 'Chicken', date: new Date(new Date().setHours(19)),img:'images/img3.png'},
      ]
    },
    {
      name : "Diabetic's Delight",
      isMonthExpanded: false,
      isWeekExpanded: false,
      events : [
        {id: 1, name: 'Pizza', date: new Date('2 April 2018'),img:'images/img1.png'},
        {id: 2, name: 'Meal 2', date: new Date('2 April 2018 13:00'),img:'images/img2.png'},
        {id: 3, name: 'Meal 3', date: new Date('2 April 2018 19:00'),img:'images/img3.png'},
        {id: 4, name: 'Pizza', date: new Date(new Date().setHours(1)),img:'images/img1.png'},
        {id: 5, name: 'Porridge', date: new Date(new Date().setHours(13)),img:'images/img2.png'},
        {id: 6, name: 'Chicken', date: new Date(new Date().setHours(19)),img:'images/img3.png'},
      ]
    }
  ];
}
