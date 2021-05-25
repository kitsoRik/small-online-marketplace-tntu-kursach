import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: NbMenuItem[] = [];

  constructor(private appService: AppService) {
    this.appService.user$.subscribe((u: any) => {

      
    const result: NbMenuItem[] = [this.buildUserMenuItem(u)]; 

      if(u) {
        
      result.push({
        title: 'Products',
        children: [{
          title: 'Search',
        },{
          title: 'Add',
          link: 'add-product'
        }],
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
