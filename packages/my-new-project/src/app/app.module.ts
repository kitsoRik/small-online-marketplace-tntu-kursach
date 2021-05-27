import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbMenuModule, NbInputModule, NbToastrModule, NbCardModule, NbUserModule, NbRadioModule, NbSelectModule, NbCheckboxModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ProductComponent } from './product/product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    SearchProductsComponent,
    ProductComponent,
    MyProductsComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    //  RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbCardModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NgxDatatableModule,
    BrowserModule,
    NbCheckboxModule,
    NbDialogModule.forRoot()
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
