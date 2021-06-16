import {Component, Inject, OnInit} from '@angular/core';
import {ChangePassword} from "./model/change-password";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserResponse} from "../model/user-response";
import {AbstractControlOptions, FormBuilder, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/validators/custom-validators";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePassword: ChangePassword = {old_password: '', new_password: ''};
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  changePasswordForm: any;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserResponse, private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;

    const formOptions: AbstractControlOptions = {validators: CustomValidators.confirmPasswordValidator('newPasswordInput', 'confirmPassword')};
    this.changePasswordForm = this.formBuilder.group({
      oldPasswordInput: ['', [Validators.required]],
      newPasswordInput: ['', Validators.compose([Validators.required, CustomValidators.passwordValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required, CustomValidators.passwordValidator()])]
    }, formOptions);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.changePassword.old_password = this.changePasswordForm.get('oldPasswordInput').value;
    this.changePassword.new_password = this.changePasswordForm.get('confirmPassword').value;
    this.dialogRef.close(this.changePassword);
  }
}
