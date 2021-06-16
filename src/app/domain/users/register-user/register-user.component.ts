import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, Validators} from "@angular/forms";
import {UserRequest} from "../model/user-request";
import {CustomValidators} from "../../../core/validators/custom-validators";
import {UsersService} from "../users.service";
import {NotificationSnackService} from "../../../core/commons/notification-component/notification-snack.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  isSubmitting = false;
  now = new Date();

  userRequest: UserRequest = {
    age: 0,
    name: '',
    email: '',
    password: ''
  };

  hidePassword = true;
  hidePasswordConfirm = true;
  userForm: any;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private ns: NotificationSnackService,
              public datePipe: DatePipe) {
  }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {validators: CustomValidators.confirmPasswordValidator('password', 'confirmPassword')};
    this.userForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, CustomValidators.onlySpacesdValidator()])],
      age: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, CustomValidators.passwordValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required, CustomValidators.passwordValidator()])]
    }, formOptions);
  }

  goBack() {
    window.history.back();
  }

  submitForm(event:any) {
    event.preventDefault();
    this.isSubmitting = true;
    this.userRequest = this.userForm.value
    this.usersService.enrroll(this.userRequest).subscribe(res => {
        this.isSubmitting = false;
        this.ns.openFromComponent({
          title: `Usuario ${this.userRequest.name}`,
          message: 'Usuario registrado satisfactoriamente',
          icon: 'info',
          search: this.userRequest.name
        }, null!, 9000, 'success');
        this.goBack();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isSubmitting = false;
          this.ns.openFromComponent({
            title: `Usuario ${this.userRequest.name}`,
            message: err.error.message,
            icon: 'error',
            search: this.userRequest.name
          }, null!, 9000, 'danger');
        } else {
          this.isSubmitting = false;
          this.ns.openFromComponent({
            title: `Usuario ${this.userRequest.name}`,
            message: err.error.message,
            icon: 'error',
            search: this.userRequest.name
          }, null!, 9000, 'danger');
        }
      }
    );
  }
}
