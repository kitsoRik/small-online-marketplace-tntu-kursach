import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formGroup = new FormGroup({
    firstName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router) { }


  onSubmit() {
    console.log(this.formGroup.value);
    this.httpClient.post('localhost:3000', {}).subscribe(() => {
      console.log(1);
    });
    this.toastrService.show('success', `Registered`, { status: 'success' });
    this.router.navigateByUrl('/')
  }
}
