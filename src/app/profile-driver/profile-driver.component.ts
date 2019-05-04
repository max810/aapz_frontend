import { Component, OnInit } from '@angular/core';
import { AAPZ_api, DriverStats } from '../services/aapz-api';
import { TranslateService } from '@ngx-translate/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts'
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils'

@Component({
  selector: 'app-profile-driver',
  templateUrl: './profile-driver.component.html',
  styleUrls: ['./profile-driver.component.css']
})
export class ProfileDriverComponent implements OnInit {

  data: any[];
  place: Number;
  advice: string;
  desc: string;
  totalRides: Number;

  public _(str: string | string[]) { return _(str) };
  constructor(private aapzApi: AAPZ_api, public translate: TranslateService) {
    // aapzApi.getMyDriverStats()  
  }

  ngOnInit() {
    this.aapzApi.getMyDriverStats().subscribe(x => {
      this.totalRides = x.ridesTotal;
      let classes = x.classesStatsScaled;
      classes["mobile"] = classes["1_mobile_right"];
      classes["mobile"] += classes["2_mobile_right_head"];
      classes["mobile"] += classes["3_mobile_left"];
      classes["mobile"] += classes["4_mobile_left_head"];

      delete classes["1_mobile_right"];
      delete classes["2_mobile_right_head"];
      delete classes["3_mobile_left"];
      delete classes["4_mobile_left_head"];

      let data = [];
      for (let k of Object.keys(classes)) {
        let name = k.replace(/\d_/, '');
        let item = {
          "name": this.translate.instant(_("stats." + name)),
          "value": Math.round(classes[k] * 100),
        };

        data.push(item);
      }

      this.data = data;
      
      let drivingStyle = this.toKebab(x.drivingStyle);
      let translateKey = `stats.${drivingStyle}`;
      this.desc = translateKey + ".description";
      this.advice = translateKey + ".advice";
    });

    this.aapzApi.getMyRatingPlace().subscribe(x => {
      this.place = x;
    });
  }
  // = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   }
  // ];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['green', 'darkred', 'darkblue', 'blue', '#AF4A08', 'red', 'orange']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;


  onSelect(event) {
    console.log(event);
  }

  private toKebab(str){
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
