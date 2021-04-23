import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductItemComponent } from './list/product-item/product-item.component';
import { ProductListComponent } from './list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forChild({ extend: true }),
  ],
  providers: [],
})
export class ProductModule {}
