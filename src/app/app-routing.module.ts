import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product/detail/product-detail.component';
import { ProductListComponent } from './product/list/product-list.component';

const routes: Routes = [
  { path: 'home', component: ProductListComponent },
  // { path: 'cart', component: UserDetailReactiveComponent },
  // { path: 'user/login', component: LoginComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
