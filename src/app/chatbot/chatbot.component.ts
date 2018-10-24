import { Component, OnInit } from '@angular/core';
import { Message } from '../models';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  public message : Message;
  public messages : Message[];
  constructor() {
    this.message = new Message('', 'assets/images/detective.svg', false);
    this.messages = [
      //new Message('Welcome to chatbot universe', 'assets/images/bot.jpg', true, new Date())
    ];
   }

  ngOnInit() {
  }

}
