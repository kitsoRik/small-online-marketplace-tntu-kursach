import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  user$ = new BehaviorSubject<any>(null);

  constructor() { }

  setUser(data: any) {
    this.user$.next(data);
  }
}
