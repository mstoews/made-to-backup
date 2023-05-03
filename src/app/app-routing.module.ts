import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['authentication/split-screen/sign-in']);
const redirectLoggedInToHome = () => redirectUnauthorizedTo(['home']);

const routes: Route[] = [
   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
   },
   { path: 'home',
      loadChildren: () => import('./modules/landing-page/landing-page.module').then( (mod) => mod.LandingPageModule),
      data: { state: 'home' },
      title: 'Made To',
   },
   {
    path: 'authentication',
    loadChildren: () => import('./modules/pages/authentication/authentication.module').then((mod) => mod.AuthenticationModule),
    data: { state: 'authenication' },
    title: 'Login'
   },
   {
      path: 'login',
      loadChildren: () => import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
      data: { state: 'login' },
      title: 'Login'
   },
   {
    path: 'shop',
    loadChildren: () => import('./modules/shop/shop.module').then( (mod) => mod.ShopModule),
    data: { state: 'shop' },
    title: 'Shop'
   },
   {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then( (mod) => mod.BlogModule),
    data: { state: 'blog' },
    title: 'Thoughts'

   },
   {
    path: 'blog-admin',
    loadChildren: () => import('./modules/blog-admin/blog-admin.module').then( (mod) => mod.BlogAdminModule),
    data: { state: 'blog-admin' },
    title: 'Blog Admin'
   },

   {
    path: 'collections-admin',
    loadChildren: () => import('./modules/collections-admin/collections-admin.module').then( (mod) => mod.CollectionsAdminModule),
    data: { state: 'collection-admin' },
    title: 'Collection Admin'
   },

   {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then( (mod) => mod.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome, state: 'admin'  },
    title: 'Maintenance'
   },
   {
    path: 'collections',
    loadChildren: () => import('./modules/products/products.module').then( (mod) => mod.ProductsModule),
    data: { state: 'collections' },
    title: 'Featured'
   },
   {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then( (mod) => mod.ProfileModule),
    data: { state: 'profile' },
    title: 'Profile'
   },
   {
      path: 'policy',
      loadChildren: () => import('./modules/policy/policy.module').then( (mod) => mod.PolicyModule),
      data: { state: 'policy' },
      title: 'Policy'
     },
     {
      path: 'tos',
      loadChildren: () => import('./modules/policy/policy.module').then( (mod) => mod.PolicyModule),
      data: { state: 'tos' },
      title: 'Terms of Service'
     },
   {
    path: '**',
    redirectTo: '/home',
    data: { state: 'home' }
    // Maybe create a page not found component page instead of just going to the 'home'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
vdTTcs8PN5fyBKz3SXOKCl09hlF3 Murray
cW5vCsElpETTpUJgT6UEDRSxadq2 Cassie
webhook: we_1M0mE4G9uU7PPnpFKwemadcN,
*/
