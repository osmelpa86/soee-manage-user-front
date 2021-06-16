import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../domain/auth/service/token-storage.service";
import {Router} from "@angular/router";
import {UserResponse} from "../../../domain/users/model/user-response";
import {UsersService} from "../../../domain/users/users.service";
import {ChangePasswordComponent} from "../../../domain/users/change-password/change-password.component";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ChangePassword} from "../../../domain/users/change-password/model/change-password";
import {ChangePasswordResponse} from "../../../domain/users/change-password/model/change-password-response";
import {NotificationSnackService} from "../../commons/notification-component/notification-snack.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  user: UserResponse = {
    id: 0,
    name: '',
    age: 0,
    email: '',
  };

  constructor(private token: TokenStorageService,
              private route: Router,
              private userService: UsersService,
              public dialog: MatDialog,
              private ns: NotificationSnackService) {
  }

  ngOnInit(): void {
    this.loadProfileUser();
  }

  logout() {
    // this.router.navigateByUrl('/login');
    this.token.signOut();
    this.route.navigate(['/login']);
  }

  loadProfileUser() {
    this.userService.getByEmail(this.token.getUsername()!).subscribe(response => {
      this.user = response;
    });
  }

  showChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: this.user,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
      const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
      if (confirmed) {
        const changePassword: ChangePassword = confirmed;
        this.userService.changePassword(changePassword, this.user.id).subscribe(response => {
          const changePasswordResponse: ChangePasswordResponse = response;
          if (changePasswordResponse.valid === true) {
            this.ns.openFromComponent({
              title: `Usuario ${this.user.email}`,
              message: `Se ha cambiado satisfactoriamente la contraseña`,
              icon: 'info',
              search: this.user.email
            }, null!, 9000, 'success');
          } else {
            this.ns.openFromComponent({
              title: `Usuario ${this.user.email}`,
              message: changePasswordResponse.message,
              icon: 'error',
              search: this.user.email
            }, null!, 9000, 'danger');
          }
        });
      }
    });
  }
}
