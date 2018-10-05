import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  holidays = [
    {
      Holiday: "Dushehra",
      Month: "October",
      Day: "Friday",
      Date: "19"
    },
    {
      Holiday: "Diwali",
      Month: "November",
      Day: "Wednesday",
      Date: "7"
    },
    {
      Holiday: "Diwali",
      Month: "November",
      Day: "Thursday",
      Date: "8"
    },
    {
      Holiday: "Guru Nanak Jayanti",
      Month: "November",
      Day: "Friday",
      Date: "23"
    },
    {
      Holiday: "Christmas",
      Month: "December",
      Day: "Tuesday",
      Date: "25"
    },
    {
      Holiday: "New Year",
      Month: "January",
      Day: "Sunday",
      Date: "01"
    },
    {
      Holiday: "Republic Day",
      Month: "January",
      Day: "Thursday",
      Date: "26"
    },
    {
      Holiday: "Holi",
      Month: "March",
      Day: "Friday",
      Date: "2"
    },
    {
      Holiday: "Independence Day",
      Month: "August",
      Day: "Wednesday",
      Date: "15"
    },
    {
      Holiday: "Rakshabandan",
      Month: "August",
      Day: "Sunday",
      Date: "26"
    }
  ]

}
