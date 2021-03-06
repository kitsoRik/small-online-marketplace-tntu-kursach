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
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router) { }


  onSubmit() {
    console.log(this.formGroup.value);
    this.httpClient.post('https://api.tntu.rostik.link/register', {
      ...this.formGroup.value
    }).subscribe(() => {
      this.router.navigateByUrl('/')
      this.toastrService.show('Now you can login', `Registered`, { status: 'success' });
    });
  }
}
