import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LayoutComponent} from "./core/layout/layout/layout.component";
import {LoginComponent} from "./domain/auth/login/login.component";
import {AuthGuardLoginService} from "./domain/auth/guard/auth-guard-login.service";
import {ListUserComponent} from "./domain/users/list-user/list-user.component";
import {AuthGuard} from "./domain/auth/guard/auth-guard.service";
import {Error404Component} from "./core/errors/error-404/error-404.component";
import {AddUserComponent} from "./domain/users/add-user/add-user.component";
import {RegisterUserComponent} from "./domain/users/register-user/register-user.component";
import {EditUserComponent} from "./domain/users/edit-user/edit-user.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'error',
    pathMatch: 'full',
  }, {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardLoginService]
      },
      {
        path: 'registrarse',
        component: RegisterUserComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        component: ListUserComponent,
        canActivate: [AuthGuard],
        children: [
        ]
      },
      {
        path: 'adicionar',
        component: AddUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        component: Error404Component
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
