import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _hubConnection: HubConnection;
  msgs: string[] = ["sads"];
  imgsrc = "";
  connection: HubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5000/streamHub")
    .build();
  constructor() {

  }

  startStreaming() {
    const connect = this.connection;
    const parent = this;

    connect.start().then(function () {
      connect.stream('VideoStream').subscribe({
        next: (item) => {
          // var image = new Image();
          parent.imgsrc = 'data:image/png;base64,' + item;
          
          // console.log(item);
          // parent.msgs.push(item.toString());
        },
        complete: () => {
          console.log("finished.");
        },
        error: (err) => {
          console.log(err);
        }
      });
    })
  }

  ngOnInit(): void {
  
  }
}