import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  msgs: string[] = ["sads"];
  imgsrc = "";
  clslabel = "None";
  clr = "green";
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
  connection: HubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/streamHub")
    .build();
  constructor() {

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

      connect.stream('VideoStream').subscribe({
        next: (item) => {
          // var image = new Image();
          parent.imgsrc = 'data:image/png;base64,' + item;

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
        // console.log(x);
        parent.clslabel = parent.class_names[x];
        parent.clr = x == 0 ? "green" : "red";
      });

    });


  }

  ngOnInit(): void {

  }
}