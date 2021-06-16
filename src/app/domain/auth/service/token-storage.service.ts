import {Injectable} from '@angular/core';
import {UserResponse} from "../../users/model/user-response";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const USERID_KEY = 'AuthUserid';
const AUTHORITIES_KEY = 'AuthAuthorities';
const PROFILE_KEY = 'AuthProfile';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }

  signOut() {
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveUserid(userid: string) {
    localStorage.removeItem(USERID_KEY);
    localStorage.setItem(USERID_KEY, userid);
  }

  public getUserid(): string | null {
    return localStorage.getItem(USERID_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public saveProfile(profile: UserResponse) {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  public getProfile(): UserResponse {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)!);
  }
}
