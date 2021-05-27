import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { SearchProductsComponent } from './search-products/search-products.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'search',
    component: SearchProductsComponent 
  },
  {
    path: 'products/:id',
    component: ProductComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
