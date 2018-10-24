import { Component } from '@angular/core';
import {USB, USBDevice, USBOptions} from 'webusb';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*public usb = new USB({
    devicesFound: this.handleDevicesFound

  });*/

  constructor() {
    /*this.usb.requestDevice({
      filters: [{vendorId:  0x0d28}]
    })
      .then(device => {
        console.log(JSON.stringify(device, (key, value) => {
          if (key === 'interfaces') return `[${value.length}...]`;
          return value;
        }, '\t'));
        process.exit();
      })
      .catch(error => {
        console.log(error.message);
        process.exit();
      });*/
  }


  /*handleDevicesFound(devices:  USBDevice[], selectFn: any): Array<USBDevice> {
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      const input = process.stdin.read();
      if (input === '\u0003') {
        process.exit();
      } else {
        const index = parseInt(input);
        if (index && index <= devices.length) {
          process.stdin.setRawMode(false);
          selectFn(devices[index - 1]);
        }
      }
    });

    console.log('select a device to see it\'s active configuration:');
    devices.forEach((device, index) => {
      console.log(`${index + 1}: ${device.productName || device.serialNumber}`);
    });

  }*/
}




