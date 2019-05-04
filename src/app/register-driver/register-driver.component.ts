import { Component, OnInit } from '@angular/core';
import { DriverRegisterModel, AAPZ_api, Company } from '../services/aapz-api';

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css']
})
export class RegisterDriverComponent implements OnInit {
  public companies: Company[];
  constructor(private api: AAPZ_api) {
    let parent = this;
    api.getAllCompanies().subscribe(
      x => parent.companies = x,
      _ => {
        parent.companies = [
          new Company({ name: "Company1" }),
          new Company({ name: "Company2" }),
        ]
      });
  }

  ngOnInit() {
    DriverRegisterModel;
  }

}
