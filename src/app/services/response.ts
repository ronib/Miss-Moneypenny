import { Message } from "../models/message";
import {ChattyKathy} from "./amazon-polly"
import * as AWS from 'aws-sdk';

import { Http, Headers } from '@angular/http';

export function handleResponses(res: any, messages:any, service): void {

    switch (res.result.fulfillment.speech) {
        case "please connect the person's mobile device": {
            //statements;
            deviceDetected(res, messages);
            break;
        }
        case "ok. extracting.": {
            extracting(res, messages, service);

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
  a(res, messages);
}
function a (res: any, messages:any){
console.log('kkkkkkkkkkkkkkkkkkkkk');
  var awsCredentials = new AWS.Credentials("AKIAIH2B734RKZ2MNIQA","BBTJ2QTvKVlexX2UemY9PivpB6jJjHSjVJ6sTGWs");
  var settings = {
    awsCredentials: awsCredentials,
    awsRegion: "us-west-2",
    pollyVoiceId: "Justin",
    cacheSpeech: true
  }

  var kathy = ChattyKathy(settings);

  kathy.Speak('hello, my name is ketty');

}

function deviceDetected(res: any, messages:any) {
    messages.push(
        new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );
    setTimeout(() => {
        messages.push(
            new Message("iPhone 6s was detected. What do you want to do now? (extract, investigate)", 'assets/images/bot.png', true, null)
        );
    }, 5000);
}

function extracting(res: any, messages:any, service) {
    messages.push(
        new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );
    console.log("Service", service);
    service.subscribe(data => {
        console.log("data", data);
        this.messages.push(
          new Message(data, 'assets/images/bot.png', true, res.timestamp)
        );
      });
    setTimeout(() => {
        messages.push(
            new Message(`i suspect the person is invloved in terror activities due to the following reasons:
            The person visited the following <b>countries</b>:
            Syria
            Iran
            `, 'assets/images/bot.png', true, null)
        );
    }, 5000);
}
