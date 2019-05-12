import { Component, OnInit } from '@angular/core';
import { AAPZ_api, DriverStats } from '../services/aapz-api';
import { TranslateService } from '@ngx-translate/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts'
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils'
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-profile-driver',
  templateUrl: './profile-driver.component.html',
  styleUrls: ['./profile-driver.component.css']
})
export class ProfileDriverComponent implements OnInit {
  imgSrc: string;
  clslabel = "None";
  clr = "green";
  timer;
  class_names = [
    '0_normal_driving',
    '1_mobile_right',
    '2_mobile_right_head',
    '3_mobile_left',
    '4_mobile_left_head',
    '5_radio',
    '6_drink',
    '7_search',
    '8_make_up',
    '9_talking'
  ]
  streamExistsProp: boolean = false;
  data: any[];
  place: Number;
  advice: string;
  desc: string;
  totalRides: Number;
  driverId: string;
  connection: HubConnection;

  public isDriver() {
    if (this.authService.getProfile() == 'driver') {
      return true;
    }

    return false;
  }

  public _(str: string | string[]) { return _(str) };
  constructor(private aapzApi: AAPZ_api, public translate: TranslateService, private authService: AuthService,
    public router: Router, private route: ActivatedRoute) {
    // aapzApi.getMyDriverStats()  
    const id = route.snapshot.paramMap.get('id');
    this.driverId = id;
    this.connection = new HubConnectionBuilder().withUrl(`http://localhost:5000/streamHub`).build();
  }

  ngOnInit() {
    let func = this.isDriver() ? this.aapzApi.getMyDriverStats : () => this.aapzApi.getDriverStats(this.driverId);
    func().subscribe(x => {
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
    if (this.isDriver()) {
      this.aapzApi.getMyRatingPlace().subscribe(x => {
        this.place = x;
      });


    }
    else {
      this.aapzApi.getAllDriversRating().subscribe(x => {
        this.place = x.indexOf(this.driverId) + 1;
      })
    }
    let parent = this;
    if (!this.isDriver()) {
      parent.timer = setInterval(function () {
        parent.aapzApi.streamExists(parent.driverId).subscribe(x => {
          if (x) {
            parent.startStreaming();
            clearInterval(parent.timer);
            parent.streamExistsProp = true;
            console.log("Stream exists.");
          }
          else {
            parent.streamExistsProp = false;
            console.log("Stream doesn't exist.");
          }
        });
      }, 2000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
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

  private toKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  startStreaming() {
    const connect = this.connection;
    const parent = this;


    connect.start().then(function () {
      // connect.stream("InferenceStream").subscribe({
      //   next: (item) => {
      //     console.log(item);
      //     this.clslabel = item.toString();
      //     this.clr = this.clslabel == "0" ? "green" : "red";
      //   },
      //   complete: () => {
      //     console.log("finished classes.");
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // });

      connect.stream('VideoStream', parent.driverId).subscribe({
        next: (item) => {
          // var image = new Image();
          parent.imgSrc = 'data:image/png;base64,' + item;

          // console.log(item);
          // parent.msgs.push(item.toString());
        },
        complete: () => {
          console.log("finished video.");
        },
        error: (err) => {
          console.log(err);
        }
      });

      console.log("video stream started");

      connect.on("InferenceMessage", x => {
        let y = parseInt(x);
        // console.log(x);
        if (Number.isNaN(y)) {
          parent.clslabel = x;
          parent.clr = "brown";
          return;
        }
        parent.clslabel = parent.class_names[y];
        parent.clr = x == 0 ? "green" : "red";
      });

    });


  }

  streamExists() {
    return this.aapzApi.streamExists(this.driverId);
  }
}
