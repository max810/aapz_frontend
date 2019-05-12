import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
// import { AuthorizationComponent } from './authorization-component/authorization.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDriverComponent } from './profile-driver/profile-driver.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'register-driver', component: RegisterDriverComponent },
  { path: 'register-manager', component: RegisterManagerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-driver/:id', component: ProfileDriverComponent },
  { path: 'authorization', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'auth', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
