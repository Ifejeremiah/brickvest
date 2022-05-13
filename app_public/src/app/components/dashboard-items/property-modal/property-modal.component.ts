import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Renderer2, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.css']
})
export class PropertyModalComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private transactionService: TransactionsService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  @Input() data: any;

  ngOnInit(): void {
    this.createAndAppend()
  }

  public totalCost!: number;

  private transactionRef!: string;

  private userEmail!: string;

  private publicKey = 'FLWPUBK_TEST-af7f7973d38fff1f1b41bdd708da3254-X'

  public details = {
    unitNumber: 1
  }

  public calculate() {
    const { unitNumber } = this.details
    let { costPerUnit } = this.data
    this.totalCost = unitNumber * costPerUnit
  }

  public async makeTransaction() {
    const body = {
      amount: this.totalCost || this.data.costPerUnit,
      propertyid: this.data.id
    }
    const { data } = await this.transactionService.makeTransaction(body)
    this.transactionRef = data.transactionRef
    await this.getUserEmail()
    this.createAndAppend()
  }

  private async getUserEmail() {
    const id = this.authService.getCurrentUserId()
    const { data } = await this.userService.getUserById(id)
    this.userEmail = data.email
  }

  public createAndAppend() {
    let flutterInit = this.renderer.createElement('script');
    let flutterScript = this.renderer.createElement('script');

    flutterScript.type = `text/javascript`;
    flutterScript.text = `
    function makePayment() {
      FlutterwaveCheckout({
        public_key: "${this.publicKey}",
        tx_ref: "${this.transactionRef}",
        amount: "${this.totalCost || this.data.costPerUnit}",
        customer: { email: "${this.userEmail}" },
        currency: "NGN",
        redirect_url: 'http://localhost:4200/verify-transaction',
        customizations: {
          title: "Brickvest",
          description: "Payment for a real estate investment",
        },
      });
    }`;
    flutterInit.type = `text/javascript`;
    flutterInit.src = `https://checkout.flutterwave.com/v3.js`;

    this.renderer.appendChild(this.document.body, flutterInit);
    this.renderer.appendChild(this.document.body, flutterScript);
  }
}
