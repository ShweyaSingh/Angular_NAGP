import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material.module';
import { UserCartComponent } from './cart/user-cart.component';
import { UserLoginComponent } from './login/user-login.component';
import { UserOrderComponent } from './order/user-order.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserLoginComponent, UserCartComponent, UserOrderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule.forChild({ extend: true }),
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [],
  providers: [],
})
export class UserModule { }
