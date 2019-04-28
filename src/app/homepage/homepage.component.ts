import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  localText = {
    "en": {
      "mainText": "Welcome to home page of ACCR.",
      "aboutUrl": "About us"
    },
    "ua": {
      "mainText": "Вітаємо у системі АСТРА.",
      "aboutUrl": "Про нас"
    }
  };
  local: string;
  constructor() { }
  ngOnInit() {
    this.local = localStorage.getItem('local');
    console.log(this.local);
  }
}
