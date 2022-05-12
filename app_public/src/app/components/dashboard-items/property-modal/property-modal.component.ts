import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Renderer2, Inject } from '@angular/core';

@Component({
  selector: 'app-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.css']
})
export class PropertyModalComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @Input() data: any;

  ngOnInit(): void {
    this.createAndAppend()
  }

  public details = {
    unitNumber: 1
  }

  public calculate() {
    const { unitNumber } = this.details
    let { propertyCost } = this.data;
    this.data['estimate'] = (unitNumber === null || unitNumber === 0) ? propertyCost : unitNumber * propertyCost;
  }

  public createAndAppend() {
    let flutterInit = this.renderer.createElement('script');
    let flutterScript = this.renderer.createElement('script');
    flutterScript.type = `text/javascript`;
    flutterScript.text = `
    function makePayment() {
      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
        tx_ref: "titanic-48981487343MDI0NzMx",
        amount: ${this.data.estimate},
        currency: "NGN",
        // payment_options: "card, banktransfer, ussd",
        // redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
        redirect_url: 'http://localhost:4200/co-own',
        // meta: {
        //   consumer_id: 23,
        //   consumer_mac: "92a3-912ba-1192a",
        // },
        customer: {
          email: "jerryroboy16@gmail.com",
          phone_number: "08025925416",
          name: "Ife Jeremiah",
        },
        customizations: {
          title: "Brickvest",
          description: "Payment for an awesome cruise",
          logo: "https://onebrick.herokuapp.com/favicon.ico",
        },
      });
    }
    `;
    flutterInit.type = `text/javascript`;
    flutterInit.src = `https://checkout.flutterwave.com/v3.js`;

    this.renderer.appendChild(this.document.body, flutterInit);
    this.renderer.appendChild(this.document.body, flutterScript);
  }
}
