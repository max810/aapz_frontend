import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  languageChangeClick() {
    console.log(this.translate.currentLang);
    this.translate.use(this.translate.currentLang == "en" ? "ua" : "en");
  }
}
