import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthorizationComponent } from './authorization-component/authorization.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { AAPZ_api } from './services/aapz-api';
import { TokenInterceptor } from './services/token-interceptor';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDriverComponent } from './profile-driver/profile-driver.component';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AuthorizationComponent,
    PageNotFoundComponent,
    HeaderComponent,
    RegisterDriverComponent,
    RegisterManagerComponent,
    ProfileComponent,
    ProfileDriverComponent,
    ProfileManagerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    // configure the imports
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AAPZ_api,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
],
  bootstrap: [AppComponent]
})

export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}