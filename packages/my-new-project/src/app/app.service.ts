import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  get accessKey() { return localStorage.getItem('ac') || null; }
  set accessKey(key: string | null) {
    if(key) {
      localStorage.setItem("ac", key);
    } else {
      localStorage.removeItem("ac");
    }
   }

  user$ = new BehaviorSubject<any>(null);

  constructor() { }

  setUser(data: any) {
    this.user$.next(data);

    if(!data) {
      this.accessKey = null;
    }
  }
}
