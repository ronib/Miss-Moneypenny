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

      this.handleResponses(res);

    });

    this.message = new Message('', 'assets/images/user.png', false);
  }

  public handleResponses(res: any) {
    switch (res.result.fulfillment.speech) {
      case "please connect the person's mobile device": {
        //statements; 
        this.deviceDetected(res);
        break;
      }
      case "ok. extracting.": {
        this.extracting(res);

        break;
      }
      case "xxx": {
        //statements; 
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  public deviceDetected(res: any) {
    this.messages.push(
      new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );
    setTimeout(() => {
      this.messages.push(
        new Message("iPhone 6s was detected. What do you want to do now? (extract, investigate)", 'assets/images/bot.png', true, null)
      );
    }, 5000);
  }

  public extracting(res: any) {
    this.messages.push(
      new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );
    this.dialogFlowService.getAnalyticsResponse().subscribe(data => {
      const analytics = data.fulfillmentMessages;
      console.log("data", analytics);
      let str = "";
      for (let i = 0; i < analytics.length; i++) {
        if (i == 0) {
          const media = analytics[0].Media;
          console.log("media", media);
          str += `found media: ${media[0]} and ${media[1]} `;
        } else if (i == 1) {
          const countries = analytics[1].Countries;
          console.log("countries", countries);

          str += `countries are:`;
          for (let c in countries) {
            str += c + " ";
          }
        }
        else if (i == 2) {
          const contacts = analytics[2].Contacts;
          console.log("contacts", contacts);

          str += `contacts are: ${contacts.Name} + ${contacts.Img}`;

        } else if (i == 3) {

          const terms = analytics[3].suspiciousTerms;
          console.log("terms", terms);

          str += `terms are: `;
          for (let i = 0; i < terms.length; i++) {
            str += `${terms[i]}   `;
          }
          // console.log(terms);

        }
      }

      this.messages.push(
        new Message(str, 'assets/images/bot.png', true, res.timestamp)
      );
    });
    setTimeout(() => {
      this.messages.push(
        new Message(`i suspect the person is invloved in terror activities due to the following reasons:
            The person visited the following <b>countries</b>:
            Syria
            Iran
            `, 'assets/images/bot.png', true, null)
      );
    }, 5000);
  }
}
