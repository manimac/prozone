import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {

  status = [
    {
      id: 1,
      name: 'In progress'
    },
    {
      id: 2,
      name: 'Pending'
    },
    {
      id: 3,
      name: 'Completed'
    },
    {
      id: 4,
      name: 'Rejected'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
