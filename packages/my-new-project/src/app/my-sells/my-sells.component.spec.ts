import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySellsComponent } from './my-sells.component';

describe('MySellsComponent', () => {
  let component: MySellsComponent;
  let fixture: ComponentFixture<MySellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySellsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
