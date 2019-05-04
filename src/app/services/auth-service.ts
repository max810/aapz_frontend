import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AAPZ_api, AuthModel, DriverRegisterModel, ManagerRegisterModel } from './aapz-api';
// import { LoginModel } from '../shared/login-model.type';
// import { RegisterModel } from '../shared/register-model.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged(): boolean {
    return localStorage.getItem('jwt') ? true : false;
  }
  constructor(public backend: AAPZ_api) {

  }
  redirectUrl: string;

  getToken() {
    return localStorage.getItem('jwt');
  }

  getProfile() {
    return localStorage.getItem('profile');
  }

  loginManager(loginModel: AuthModel, onFailure: (error: any) => void = () => {}, onSuccess: () => void = () => {}){
    let response = this.backend.loginManager(loginModel);
    response.subscribe(token => {
      localStorage.setItem('jwt', token);
      localStorage.setItem('profile', 'manager');
      // localStorage.setItem('user_name', x.user_name);
    },
      onFailure,
      onSuccess
    );
  }

  loginDriver(loginModel: AuthModel, onFailure: (error: any) => void = () => {}, onSuccess: () => void = () => {}) {
    let response = this.backend.loginDriver(loginModel);
    response.subscribe(token => {
      localStorage.setItem('jwt', token);
      localStorage.setItem('profile', 'driver');
      // localStorage.setItem('user_name', x.user_name);
    },
      onFailure,
      onSuccess
    );
  }

  logout() {
    this.backend.logOff();
    localStorage.removeItem('jwt');
    localStorage.removeItem('profile');
    // localStorage.removeItem('user_name');
  }

  registerDriver(registerModel: DriverRegisterModel, onFailure, onSuccess) {
    throw new Error("registerDriver is not implemented!");
    // console.log(registerModel.toUserRegisterRequestModel());
    // let response = this.backend.accrAuthRegisterPost(registerModel.toUserRegisterRequestModel());
    // console.log(response);
    // response.subscribe(_x => {
    //   console.log(_x)
    // },
    // onFailure,
    // onSuccess
    // );
  }

  registerManager(registerModel: ManagerRegisterModel, onFailure, onSuccess) {
    throw new Error("registerManager is not implemented!");
    // console.log(registerModel.toUserRegisterRequestModel());
    // let response = this.backend.accrAuthRegisterPost(registerModel.toUserRegisterRequestModel());
    // console.log(response);
    // response.subscribe(_x => {
    //   console.log(_x)
    // },
    // onFailure,
    // onSuccess
    // );
  }
}
