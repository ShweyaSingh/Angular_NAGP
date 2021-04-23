import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCartComponent } from './cart/user-cart.component';
import { UserLoginComponent } from './login/user-login.component';
import { UserOrderComponent } from './order/user-order.component';
import { AuthenticatedUserGuard } from './authenticated-user.guard';
import { UnauthenticatedUserGuard } from './unauthenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'cart',
    component: UserCartComponent,
    canActivate: [AuthenticatedUserGuard],
  },
  {
    path: 'checkout',
    component: UserOrderComponent,
    canActivate: [AuthenticatedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
