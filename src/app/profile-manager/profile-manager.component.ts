import { Component, OnInit } from '@angular/core';
import { UserInfo, AAPZ_api } from '../services/aapz-api';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.css']
})
export class ProfileManagerComponent implements OnInit {
  // ids: string[];
  userInfos: UserInfo[] = [];
  constructor(private aapzApi: AAPZ_api, public translate: TranslateService, private authService: AuthService,
    public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.aapzApi.getAllDriversRating().subscribe(ids => {
      for(let id of ids) {
        this.aapzApi.getUserInfo(id).subscribe(info => {
          let idx = ids.indexOf(id);
          this.userInfos[idx] = info;
        });
      }
    });
  }

}
