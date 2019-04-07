import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as Hls from 'hls.js';

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

      connect.stream('VideoStream', 0).subscribe({
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
        let y = parseInt(x);
        // console.log(x);
        if (Number.isNaN(y)){
          parent.clslabel = x;
          parent.clr = "brown";
          return;
        }
        parent.clslabel = parent.class_names[y];
        parent.clr = x == 0 ? "green" : "red";
      });

    });


  }

  ngOnInit(): void {
    // var video: any = document.getElementById('video');
    // if (Hls.isSupported()) {
    //   console.log("HLS OK");
    //   var hls = new Hls();
    //   hls.loadSource('http://localhost:5000/api/values/video');
    //   hls.attachMedia(video);
    //   hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //     video.play();
    //   });
    // }
    // // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // // This is using the built-in support of the plain video element, without using hls.js.
    // // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
    // // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
    // else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //   console.log("HLS NOT OK, BUT WORKING ANYWAY")
    //   video.src = 'http://localhost:5000/api/values/video';
    //   video.addEventListener('loadedmetadata', function () {
    //     video.play();
    //   });
    // }
  }
}