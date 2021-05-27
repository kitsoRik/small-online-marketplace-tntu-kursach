import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ColumnMode } from '@swimlane/ngx-datatable';

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

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private activated: ActivatedRoute) {
    this.find('name', 'ASC');
    }


    find(sortBy: string, sortOrder: string) {
      this.httpClient.get(`http://localhost:3000/my-products?sortField=${sortBy}&sortOrder=${sortOrder}`).subscribe((result: any) => {
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
    this.httpClient.patch(`http://localhost:3000/products/${rowId}`, { [columnName]: typeof event === 'object' ? event.target.value : event }).subscribe((result: any) => {
       
     });
  }
}
