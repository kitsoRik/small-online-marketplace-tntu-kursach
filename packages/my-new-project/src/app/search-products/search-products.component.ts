import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import * as _ from 'lodash'

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent {
  private _input: string = '';

  get input() { return this._input; }
  set input(value: string) { this._input = value; this.find() }

  get selectedField() { return this._selectedField; }
  set selectedField(value: string) { this._selectedField = value; this.find() }

  private _selectedField: string = 'name';
 
  get selectedOrder() { return this._selectedOrder; }
  set selectedOrder(value: string) { this._selectedOrder = value; this.find() }

  private _selectedOrder: string = 'asc';

  cards: any = []

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router) {this.find(); }

  find = _.debounce(() => {
    this.httpClient.get(`http://localhost:3000/products/search?input=${this._input}&sortField=${this._selectedField}&sortOrder=${this._selectedOrder}`).subscribe((result: any) => {
      this.cards = result;
    });
  }, 400);
}
