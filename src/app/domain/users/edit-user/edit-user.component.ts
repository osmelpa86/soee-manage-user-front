import {Component, OnInit} from '@angular/core';
import {UserRequest} from "../model/user-request";
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../users.service";
import {NotificationSnackService} from "../../../core/commons/notification-component/notification-snack.service";
import {CustomValidators} from "../../../core/validators/custom-validators";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  isSubmitting = false;

  userRequest: UserRequest = {
    id: 0,
    age: 0,
    name: '',
    email: '',
  };

  userForm: any;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private ns: NotificationSnackService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required, CustomValidators.onlySpacesdValidator()])],
      age: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.init();
  }

  goBack() {
    window.history.back();
  }

  init() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      this.usersService.getOne(id).subscribe(response => {
        this.userRequest = response;
        this.userForm.patchValue(response);
      }, error => {
        this.ns.openFromComponent({
          title: `Usuario`,
          message: 'No es posible obtener el usuario en este momento',
          icon: 'error',
          search: null!
        }, null!, 9000, 'danger');
        this.goBack();
      });
    });
  }

  submitForm(event:any) {
    event.preventDefault();
    this.isSubmitting = true;
    this.userRequest = this.userForm.value
    this.usersService.edit(this.userRequest).subscribe(res => {
        this.isSubmitting = false;
        this.ns.openFromComponent({
          title: `Usuario ${this.userRequest.name}`,
          message: 'Usuario actualizado satisfactoriamente',
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
