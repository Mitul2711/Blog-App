import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermAndConditionComponent } from './pages/term-and-condition/term-and-condition.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { CategoryNavbarComponent } from './layouts/category-navbar/category-navbar.component';
import { SubscriberComponent } from './subscriber/subscriber.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/posts', component: AllPostComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/posts/new', component: NewPostComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/sunscribers', component: SubscriberComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },


  { path: 'category/:category/:id', component: SingleCategoryComponent },
  { path: 'post/:id', component: SinglePostComponent },
  { path: 'cat-nav', component: CategoryNavbarComponent },

  { path: 'about-us', component: AboutUsComponent },
  { path: 'term-and-condition', component: TermAndConditionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
