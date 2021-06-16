import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../model/login-request";
import {AuthService} from "../service/auth.service";
import {TokenStorageService} from "../service/token-storage.service";
import {Router} from "@angular/router";
import {NotificationSnackService} from "../../../core/commons/notification-component/notification-snack.service";
import {MatDialog} from "@angular/material/dialog";
import {JwtResponse} from "../model/jwt-response";
import {UsersService} from "../../users/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  now: Date = new Date();
  loginForm: any;
  isLoginFailed = false;
  loginInfo: LoginRequest = {username: '', password: ''};

  constructor(public datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private route: Router,
              private ns: NotificationSnackService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]]
    });
  }

  submitForm(event:any) {
    this.loginInfo = this.loginForm.value
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        const jwtResponse: JwtResponse | null = data.body;
        this.tokenStorage.saveToken(jwtResponse!.token);
        this.tokenStorage.saveUsername(jwtResponse!.email);
        this.tokenStorage.saveAuthorities(jwtResponse!.authorities);
        this.saveProfileInCache(jwtResponse!.email);
        this.isLoginFailed = false;
        this.route.navigate(['/inicio'], {replaceUrl: true});
      },
      error => {
        this.ns.openFromComponent({
          title: `Inicio de sesión ${this.loginInfo.username}`,
          message: 'Credenciales incorrectas',
          icon: 'error',
          search: this.loginInfo.username
        }, null!, 9000, 'danger');
        this.isLoginFailed = true;
      }
    );
  }

  saveProfileInCache(email:any) {
    this.usersService.getByEmail(email).subscribe(response => {
      this.tokenStorage.saveProfile(response);
    });
  }
}
