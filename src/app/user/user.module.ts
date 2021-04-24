import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@ecommerce/shared';
import { TranslateModule } from '@ngx-translate/core';
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
    SharedModule,
  ],
  providers: [],
})
export class UserModule {}
