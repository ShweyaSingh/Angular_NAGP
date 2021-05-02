import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const components = [NavBarComponent, FooterComponent, PageNotFoundComponent];
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forChild({ extend: true }),
    MaterialModule
  ],
  exports: [components, FormsModule],
  providers: [],
})
export class LayoutModule {}
