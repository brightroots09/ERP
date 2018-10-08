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
      Date: "Oct 19th, 2018"
    },
    {
      Holiday: "Diwali",
      Month: "November",
      Day: "Wednesday",
      Date: "Nov 7th, 2018"
    },
    {
      Holiday: "Diwali",
      Month: "November",
      Day: "Thursday",
      Date: "November 8th, 2018"
    },
    {
      Holiday: "Guru Nanak Jayanti",
      Month: "November",
      Day: "Friday",
      Date: "Nov 23rd, 2018"
    },
    {
      Holiday: "Christmas",
      Month: "December",
      Day: "Tuesday",
      Date: "December 25th, 2018"
    },
    {
      Holiday: "New Year",
      Month: "January",
      Day: "Sunday",
      Date: "Jan 1st, 2019"
    },
    {
      Holiday: "Republic Day",
      Month: "January",
      Day: "Thursday",
      Date: "Jan 26th, 2019"
    },
    {
      Holiday: "Holi",
      Month: "March",
      Day: "Friday",
      Date: "Mar 2nd, 2019"
    },
    {
      Holiday: "Independence Day",
      Month: "August",
      Day: "Wednesday",
      Date: "Aug 15th, 2019"
    },
    {
      Holiday: "Rakshabandan",
      Month: "August",
      Day: "Sunday",
      Date: "Aug 26th, 2019"
    }
  ]

}
