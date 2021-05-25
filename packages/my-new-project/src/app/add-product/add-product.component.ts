import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
  });

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private appService: AppService) { }


  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.httpClient.post('localhost:3000', {}).subscribe(() => {
      console.log(1);
    });
    this.toastrService.show('success', `Logined`, { status: 'success' });
  }
}
