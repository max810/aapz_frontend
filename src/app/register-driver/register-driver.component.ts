import { Component, OnInit } from '@angular/core';
import { DriverRegisterModel } from '../services/aapz-api';

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css']
})
export class RegisterDriverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    DriverRegisterModel;
  }

}
