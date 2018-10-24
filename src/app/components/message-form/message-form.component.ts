import {Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService } from '@app/services';
import { handleResponses } from '../../services/response';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit, AfterViewInit {

  @Input('message')
  public message: Message;

  @Input('messages')
  public messages: Message[];
  @ViewChild("inpt") inputFld: ElementRef;

  constructor(private dialogFlowService: DialogflowService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.inputFld.nativeElement.focus();
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      this.messages.push(
        new Message(res.result.fulfillment.speech, 'assets/images/bot.png', true, res.timestamp)
      );
      handleResponses(res, this.messages);
    });

    this.message = new Message('', 'assets/images/user.png', false);
  }

}
