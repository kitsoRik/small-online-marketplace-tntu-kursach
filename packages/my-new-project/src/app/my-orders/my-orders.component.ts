import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppService } from '../app.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  cards: any;
  expanded = {};
  timeout: any;

  ColumnMode = ColumnMode;

  constructor(private appService: AppService,  private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private activated: ActivatedRoute) {
    this.find('name', 'ASC');
    }


    find(sortBy: string, sortOrder: string) {
      this.httpClient.get(`http://localhost:3000/my-orders`, {
        headers: {
          'Authorization': this.appService.accessKey || ''
        }
      }).subscribe((result: any) => {
       this.cards = result;
     });
    }

    onSort(event: any) {
      this.find(event.column.name, event.newValue);
    }

    onPage(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}
