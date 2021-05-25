import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  formGroup = new FormGroup({
    firstName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router, private appService: AppService) { }


  onSubmit() {
    console.log(this.formGroup.value);
    this.httpClient.post('localhost:3000', {}).subscribe(() => {
      console.log(1);
    });
    this.toastrService.show('success', `Logined`, { status: 'success' });
    this.router.navigateByUrl('/')
    this.appService.setUser({ name: 'Rostik' })
  }
}
