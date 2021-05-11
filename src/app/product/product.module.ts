import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
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
    NgxSpinnerModule,
    TranslateModule.forChild({ extend: true }),
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [],
  providers: [],
})
export class ProductModule { }
