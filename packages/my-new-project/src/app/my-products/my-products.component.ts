import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppService } from '../app.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent {

  cards: any;
  expanded = {};
  timeout: any;

  ColumnMode = ColumnMode;

  constructor(private appService: AppService, private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private activated: ActivatedRoute) {
    this.find('name', 'ASC');
    }


    find(sortBy: string, sortOrder: string) {
      this.httpClient.get(`https://api.tntu.rostik.link/my-products?sortField=${sortBy}&sortOrder=${sortOrder}`, {
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

  getRowHeight(row: any) {
    return 100;
  }

  changeCell(rowId: number, columnName: string, event: any) {
    this.httpClient.patch(`https://api.tntu.rostik.link/products/${rowId}`, { [columnName]: typeof event === 'object' ? event.target.value : event }).subscribe((result: any) => {
       
     });
  }
}
