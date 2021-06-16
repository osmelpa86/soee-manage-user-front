import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {config} from '../../app.config';
import {UsersResponse} from "./model/users-response";
import {UserResponse} from "./model/user-response";
import {UserRequest} from "./model/user-request";
import {Observable} from "rxjs";
import {ChangePassword} from "./change-password/model/change-password";
import {ChangePasswordResponse} from "./change-password/model/change-password-response";
import {UserModal} from "./model/user-modal";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  get(page: number, size: number, sort: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<UsersResponse>(`${config.url.users}?page=${page}&size=${size}&sort=${sort}`);
  }

  getAll(page: number, size: number, sort: string) {
    return this.http.get<UsersResponse>(`${config.url.users}?page=${page}&size=${size}&sort=${sort}`);
  }

  getAllWithoutPaging() {
    return this.http.get<UserResponse[]>(`${config.url.users}/all`);
  }

  getOne(id: any) {
    return this.http.get<UserResponse>(`${config.url.users}/${id}/`);
  }

  getByEmail(email: any) {
    return this.http.get<UserResponse>(`${config.url.users}/filter/${email}/`);
  }

  search(chain: string, page: number, size: number, sort: string) {
    return this.http.get<UsersResponse>(`${config.url.users}/filter/chain?chain=${chain}&page=${page}&size=${size}&sort=${sort}`);
  }

  filter(page: number, size: number, sort: string, modal: UserModal) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<UsersResponse>(`${config.url.users}/filter?&page=${page}&size=${size}&sort=${sort}`, modal);
  }

  enrroll(user: UserRequest): Observable<HttpResponse<UserRequest>> {
    return this.http.post<UserRequest>(config.url.enrroll, user,
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }

  edit(user: UserRequest) {
    return this.http.put(`${config.url.users}/${user.id}/`, user);
  }

  delete(id: number) {
    return this.http.delete(`${config.url.users}/${id}/`);
  }

  changePassword(changePassword: ChangePassword, userId: number): Observable<ChangePasswordResponse> {
    return this.http.patch<ChangePasswordResponse>(`${config.url.users}/${userId}/`, changePassword);
  }
}
