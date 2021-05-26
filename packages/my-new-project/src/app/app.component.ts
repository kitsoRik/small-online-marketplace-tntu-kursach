import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbToastrService } from '@nebular/theme';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: NbMenuItem[] = [];

  get user() { return this.appService.user$.getValue() };

  constructor(private appService: AppService, private httpClient: HttpClient, private toastrService: NbToastrService, private router: Router) {

    this.httpClient.post('http://localhost:3000/me', {
      
    }, {
      headers: {
        'Authorization': this.appService.accessKey || ''
      }
    }).subscribe((user) => {
      this.appService.setUser(user)
    });

    this.appService.user$.subscribe((u: any) => {

      
    const result: NbMenuItem[] = [this.buildUserMenuItem(u)]; 

      if(u) {
        
      result.push({
        title: 'Products',
        children: [{
          title: 'Add',
          link: 'add-product'
        },{
          title: 'Search',
          link: 'search'
        },],
      });
    }

      this.items = result;
    })
  }

  private buildUserMenuItem(user: any): NbMenuItem {
    if(!user) {
      return {
        title: 'User',
        children: [{
          title: 'Register',
          link: 'register'
        },{
          title: 'Login',
          link: 'login'
        }]
      }
    }
    return{
      title: 'User',
      children: [{
        title: 'Logout',
        link: 'logout'
      }]
    };
  }
}
