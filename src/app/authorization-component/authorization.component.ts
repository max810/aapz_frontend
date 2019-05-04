import { Component, OnInit } from '@angular/core';
import { AuthModel } from '../services/aapz-api';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import {_ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) { }
  driverModel: AuthModel = new AuthModel({
    email: "",
    password: ""
  })
  managerModel: AuthModel = new AuthModel({
    email: "",
    password: ""
  })
  onSubmitDriver() {
    let driverModel = this.driverModel;
    console.log({ driverModel });
    this.authService.loginDriver(driverModel, () => { 
      alert(this.translate.instant(_("authorization.login-error")));
    }, () => {
      console.log("DRIVER LOGGED IN SUCCESSFULLY");
      console.log(localStorage.getItem('jwt'));
      this.router.navigate(['/profile']);
    });
  }
  onSubmitManager() {
    let managerModel = this.managerModel;
    console.log({ managerModel });

    this.authService.loginManager(managerModel, () => { 
      alert(this.translate.instant(_("authorization.login-error")));
    }, () => {
      console.log("MANAGER LOGGED IN SUCCESSFULLY");
      console.log(localStorage.getItem('jwt'));
      this.router.navigate(['/profile']);
    });
  }
  ngOnInit() {

  }

}
