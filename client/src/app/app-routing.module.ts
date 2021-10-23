import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'newlist',
    component: NewListComponent,
    pathMatch: 'full',
  },
  {
    path: 'list/:listid/newtask',
    component: NewTaskComponent,
    pathMatch: 'full',
  },
  
  {
    path: 'list/:listid',
    component: TaskViewComponent,
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TaskViewComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: SignupPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
