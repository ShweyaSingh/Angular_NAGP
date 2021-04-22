import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCartComponent } from './cart/user-cart.component';
import { UserLoginComponent } from './login/user-login.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'cart', component: UserCartComponent, canActivate: [UserGuard] },
      // { path: 'checkout', component: UserCheckoutComponent, canActivate: [UserGuard]}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
