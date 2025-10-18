import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { LoginComponent } from "./login/pages/login/login.component";
import { PassResetComponent } from './pass-reset/pages/pass-reset.component';
import { PassCreateComponent } from './pass-create/pages/pass-create.component';
import { PassCreateGuard } from '../core/guards/pass-create.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'signin', loadChildren: () => import('./auth/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'signup', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'lockscreen', loadChildren: () => import('./auth/lockscreen/lockscreen.module').then(m => m.LockscreenModule)
  },
  {
    path: 'logout', loadChildren: () => import('./auth/logout/logout.module').then(m => m.LogoutModule)
  },
  {
    path: 'success-msg', loadChildren: () => import('./auth/success-msg/success-msg.module').then(m => m.SuccessMsgModule)
  },
  {
    path: 'twostep', loadChildren: () => import('./auth/twostep/twostep.module').then(m => m.TwostepModule)
  },
  {
    path: 'errors', loadChildren: () => import('./auth/errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: "not-found",
    component: NotFoundComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "recuperar-senha",
    component: PassResetComponent
  },
  {
    path: "criar-senha/:token",
    component: PassCreateComponent,
    canActivate: [PassCreateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
