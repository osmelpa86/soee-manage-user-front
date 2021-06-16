import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LayoutComponent} from "./core/layout/layout/layout.component";
import {BarComponent} from "./core/layout/bar/bar.component";
import {AppRoutingModule} from "./app-routing.module";
import {AddUserComponent} from "./domain/users/add-user/add-user.component";
import {ConfirmDeleteComponent} from "./core/commons/confirm-delete/confirm-delete.component";
import {EmptyListComponent} from "./core/commons/empty-list/empty-list.component";
import {NotificationComponent} from "./core/commons/notification-component/notification-component";
import {HighlighTitleSearchPipe} from "./core/commons/notification-component/highligh-title-search.pipe";
import {ListUserComponent} from './domain/users/list-user/list-user.component';
import {Error404Component} from "./core/errors/error-404/error-404.component";
import {LoginComponent} from "./domain/auth/login/login.component";
import {CommonModule, DatePipe} from "@angular/common";
import {AuthInterceptor} from "./domain/auth/interceptors/auth-interceptor";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./core/utils/paginator/custom_mat_paginator_intl";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS} from "./core/utils/datepicker/format-datepicker";
import {RegisterUserComponent} from "./domain/users/register-user/register-user.component";
import {ChangePasswordComponent} from "./domain/users/change-password/change-password.component";
import {FilterComponent} from "./core/commons/filter/filter.component";
import {SearchComponent} from "./core/commons/search/search.component";
import { EditUserComponent } from './domain/users/edit-user/edit-user.component';
import {MaxLengthDirective} from "./core/utils/max-length-directive";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BarComponent,
    AddUserComponent,
    RegisterUserComponent,
    ConfirmDeleteComponent,
    EmptyListComponent,
    NotificationComponent,
    HighlighTitleSearchPipe,
    ListUserComponent,
    Error404Component,
    LoginComponent,
    ChangePasswordComponent,
    FilterComponent,
    SearchComponent,
    EditUserComponent,
    MaxLengthDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [DatePipe, {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MatPaginatorIntl, useValue: new CustomMatPaginatorIntl()}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
