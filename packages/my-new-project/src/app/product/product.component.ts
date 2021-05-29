import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{
  formGroup = new FormGroup({
    deliveryAddress: new FormControl(''),
    message: new FormControl('')
  })
  product: any | null = null;

  constructor(private dialogService: NbDialogService, private appService: AppService, private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private activated: ActivatedRoute) {
   activated.params.subscribe(({ id }) => {
    this.httpClient.get(`https://api.tntu.rostik.link/products/${id}`).subscribe((result: any) => {
      this.product = result;
    });
    });
  }
  buyDialog: any | null = null;
  open(dialog: TemplateRef<any>) {
    this.buyDialog = this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  onClickBuy(dialog: any) {
    
    if(!this.appService.user$.getValue()) {
      this.router.navigateByUrl("/login");
    } else {
      this.open(dialog);
    }
  }

  onBuy(dialog: TemplateRef<any>) {
    this.httpClient.post(`https://api.tntu.rostik.link/products/${this.product.id}/buy`, {
      ...this.formGroup.value
    }, {
      headers: {
        'Authorization': this.appService.accessKey || ''
      }
    }).subscribe((result: any) => {
      this.router.navigateByUrl(`/my-orders`)
    });
    this.buyDialog.close();
      
  }
}
