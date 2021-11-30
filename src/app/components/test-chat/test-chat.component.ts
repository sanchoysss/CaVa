import { Component } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.css']
})
export class TestChatComponent {

  greetings: string[] = [];
  disabled = true;
  name?: string;
  private stompClient: Stomp.CompatClient | any;


  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const url = 'http://localhost:8080/ws?auth=Bearer ' + localStorage.getItem('token');
    const socket = new SockJS(url);
    this.stompClient = Stomp.Stomp.over(socket);
    const _this = this;
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
    this.stompClient.connect(headers,
      function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient?.subscribe('/topic/chat',
        function (hello: any) {
        console.log(hello);
        _this.showGreeting(hello.body);
      });
      },
      function (error: any) {
        console.log(error);
    });

  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient?.send(
      '/app/hello',
      {},
      JSON.stringify(this.name)
    );
  }

  showGreeting(message: string) {
    this.greetings.push(message);
  }

}
