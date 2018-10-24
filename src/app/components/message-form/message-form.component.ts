import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService } from '@app/services';

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
  ngAfterViewInit() {
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

    this.message = new Message('', 'assets/images/detective.svg', false);
  }

  public handleResponses(res: any) {
    console.log("handle response", res.result.fulfillment.speech);
    switch (res.result.fulfillment.speech) {
      case "Please connect the person's mobile device": {
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
    console.log("deviceDetected");
    this.messages.push(
      new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );

    
    setTimeout(() => {
      this.messages.splice(this.messages.length - 1, 1);

      this.messages.push(
        new Message("iPhone 6s was detected. ", 'assets/images/bot.png', true, null)
      );
      this.messages.push(
        new Message("Collecting relevant data from the device.", 'assets/images/bot.png', true, null)
      );

      this.messages.push(
        new Message("...", 'assets/images/bot.png', true, res.timestamp)
      );
      

      setTimeout(() => {

        let str = `i suspect the person is invloved in terror activities due to the following reasons:
              The person visited the following <b>countries</b> in the last two months:
              `;
        this.dialogFlowService.getAnalyticsResponse().subscribe(data => {
          const analytics = data.fulfillmentMessages;
          console.log("data", analytics);
  
          const countries = analytics[1].Countries;
          console.log("countries", countries);
  
          for (let c in countries) {
            str += c + " ";
          }
  
          str += " Conversations conducted by the person in the last month contains <b>keywords</b> related to terror such as: <br>";
          const terms = analytics[3].suspiciousTerms;
          console.log("terms", terms);
  
          for (let i = 0; i < terms.length; i++) {
            str += `${terms[i]}   `;
          }
  
          str += "The person has a <b>contact</b> who apears on the counter-terror person of interest list:<br>"
          const contacts = analytics[2].Contacts;
          console.log("contacts", contacts);
  
          str += `${contacts.Name} + <img>${contacts.Img}</img>`;
  
          const media = analytics[0].Media;
          console.log("media", media);
          str += `<br> found media: ${media[0]} and ${media[1]} `;
  
          this.messages.splice(this.messages.length - 1, 1);
          this.messages.push(
            new Message(str, 'assets/images/bot.png', true, res.timestamp)
          );
        });
  
      }, 5000);
    }, 5000);
  }

  public extracting(res: any) {
    this.messages.push(
      new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );


    

  }
}
