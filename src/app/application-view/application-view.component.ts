import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {

  applicationData: any = [];
  categoryData: any = [];
  subCategoryData: any = [];
  statusHistory: any = [];
  showLoader = false;
  statusName: any = "123";
  applicationId : any;

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

  constructor(private http: HttpRequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.applicationId= params['applicationId'];
    });

    this.loadCategories();
    this.loadSubCategories();
    this.getApplicationList();
  }

  getApplicationList() {
    this.showLoader = true;
    
    this.http.get('application/view?applicationId='+this.applicationId).subscribe(
      (response) => {
        this.applicationData = response;
        if(this.applicationData.length > 0) {
          this.statusHistory = this.applicationData[0].status;
          if(this.applicationData[0].categoryID && this.categoryData.length > 0) {
            this.categoryData.forEach(element1 => {
              if(element1._id == this.applicationData[0].categoryID)
              this.applicationData[0].categoryName = element1.name_english;
            });
          }
          if(this.applicationData[0].subCategoryID && this.subCategoryData.length > 0) {
            this.subCategoryData.forEach(element1 => {
              if(element1._id == this.applicationData[0].subCategoryID)
              this.applicationData[0].subCategoryName = element1.name_english;
            });
          }
        }
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  loadCategories() {
    this.showLoader = true;
    this.http.get('api/category/get-category').subscribe(
      (response) => {
        this.categoryData = response;
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  loadSubCategories() {
    this.showLoader = true;
    this.http.get('api/category/get-subcategory').subscribe(
      (response) => {
        this.subCategoryData = response;
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  save(){
    this.applicationData[0].status = (this.applicationData[0].status && this.applicationData[0].status.length > 0) ? this.applicationData[0].status : [];
    this.applicationData[0].status.push(this.statusName);
    this.statusHistory = this.applicationData[0].status;
    let data = this.applicationData[0];
    delete data.categoryName;
    delete data.subCategoryName;
    this.http.post('application/create', data).subscribe(
      (response) => {
        console.log("respone :"+response)
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    );
  }

  changeStatus(val){
    this.status.forEach(element => {
      if(element.id == val.value)
        this.statusName = element.name;
    });
  }

}
