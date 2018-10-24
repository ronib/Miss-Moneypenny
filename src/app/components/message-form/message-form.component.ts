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
      case "Sure. Opening Cellebrite Analytics": {
        this.openingAnalytics();
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

        let str = `I suspect the person is invloved in terror activities due to the following reasons:<br>
              The person visited the following <u>countries</u> in the last two months:
              <br>


              <br>
              `;
        this.dialogFlowService.getAnalyticsResponse().subscribe(data => {
          const analytics = data.fulfillmentMessages;
          console.log("data", analytics);

          const countries = analytics[1].Countries;
          console.log("countries", countries);
          str+="<b>";
          for (let c in countries.Name) {
            str += c + ",";
          }
          str = str.substr(0,str.length-1);
          str+="</b>";
          str += `<br><img  src="${countries.Img}" />`;
          str += "<br><br> Conversations conducted by the person in the last month contains <b>keywords</b> related to terror such as: <br>";
          const terms = analytics[3].suspiciousTerms;
          console.log("terms", terms);
          str+="<b>";
          for (let i = 0; i < terms.length; i++) {
            str += `${terms[i]}, `;
          }
          str = str.substr(0,str.length-2);
          str+="</b>";
          str += "<br><br>The person has a <b>contact</b> who appears on the counter-terror person of interest list:<br>"
          const contacts = analytics[2].Contacts;
          console.log("contacts", contacts);

          str += `<b>${contacts.Name}</b> <br> <img  src=${contacts.Img} />`;

          const media = analytics[0].Media;
          console.log("media", media[0]);
          str += `<br><br> Media found for category: <b>${media[0].category}<b><br>
          <img src=${media[0].Img[0]} />
          <img src=${media[0].Img[1]} />`;

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

  public openingAnalytics() {
    setTimeout(() => {
      window.open('./assets/images/Hackaton_Map.png');
    }, 1000);
  }
}
