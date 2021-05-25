import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) {
    this.appService.setUser(null);
    this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
  }

}
