import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  dataLists: any = [];
  showLoader = false;

  displayedColumns: string[] = ['email', 'mobile'];
  dataSource: any;
  pageSizeOptions = [10, 20, 50];
  categories: any;
  subcategories: any;
  status = [
    {
      name: 'Pending'
    },
    {
      name: 'Completed'
    },
    {
      name: 'Rejected'
    }
  ]

  types = [
    {
      name: 'Business'
    },
    {
      name: 'Individual'
    }
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpRequestService) { 
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.showLoader = true;
    this.http.get('api/users/get').subscribe(
      (response) => {
        this.dataLists = response;
        this.loadMaterial(); 
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  loadMaterial(){
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataLists);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  email: string;
  mobile: string;
}