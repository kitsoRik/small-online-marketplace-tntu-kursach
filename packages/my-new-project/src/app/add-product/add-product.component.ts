import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    isActive: new FormControl(true),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  
  options = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private appService: AppService) { }


  ngOnInit(): void {
  }

  onSubmit() {
    if(this.formGroup.invalid) return;
    
    this.httpClient.post('https://api.tntu.rostik.link/add-product', {
      ...this.formGroup.value
    }, {
      
      headers: {
        'Authorization': this.appService.accessKey || ''
      }
    }).subscribe(() => {
      console.log(1);
      this.toastrService.show('success', `Logined`, { status: 'success' });
    });
  }
}
