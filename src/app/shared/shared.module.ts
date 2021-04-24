import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [NavBarComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    RouterModule.forRoot([]),
  ],
  exports: [NavBarComponent, PageNotFoundComponent, FooterComponent],
  providers: [],
})
export class SharedModule {}
