import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signup',
    title: 'Join',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'login',
    title: 'Login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login/reset',
    loadChildren: () =>
      import('./reset/reset.module').then((m) => m.ResetModule),
  },
  {
    path: '**',
    redirectTo: 'login',
    data: { state: 'login' }
    // Maybe create a page not found component page instead of just going to the 'home'
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
