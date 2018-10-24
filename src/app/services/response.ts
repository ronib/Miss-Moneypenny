import { Message } from "../models/message";

export function handleResponses(res: any, messages:any): void {

    switch (res.result.fulfillment.speech) {
        case "please connect the person's mobile device": {
            //statements; 
            deviceDetected(res, messages);
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

function deviceDetected(res: any, messages:any) {
    messages.push(
        new Message("...", 'assets/images/bot.png', true, res.timestamp)
    );
    setTimeout(() => {
        messages.push(
            new Message("iPhone 6s was detected", 'assets/images/bot.png', true, null)
        );
    }, 5000);
}