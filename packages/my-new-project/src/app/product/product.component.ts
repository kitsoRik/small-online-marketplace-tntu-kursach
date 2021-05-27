import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{
  product: any | null = null;

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private activated: ActivatedRoute) {
   activated.params.subscribe(({ id }) => {
    this.httpClient.get(`http://localhost:3000/products/${id}`).subscribe((result: any) => {
      this.product = result;
    });
    });
  }
}
