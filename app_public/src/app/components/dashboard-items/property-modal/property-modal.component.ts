import { Component, OnInit, Input } from '@angular/core';
import { text } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-property-modal',
  templateUrl: './property-modal.component.html',
  styleUrls: ['./property-modal.component.css', './placeholder-anime.css']
})
export class PropertyModalComponent implements OnInit {

  constructor(
    private transactionService: TransactionsService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  @Input() data: any;

  ngOnInit(): void {
  }

  public totalCost!: number;

  private transactionRef!: string;

  private userEmail!: string;

  private scriptElement!: HTMLScriptElement;

  public isAttached: boolean = false;

  public details = {
    unitNumber: 1
  }

  public calculate() {
    const { unitNumber } = this.details
    let { costPerUnit } = this.data
    this.totalCost = unitNumber * costPerUnit
  }

  public async makeTransaction() {
    const body = { amount: this.totalCost || this.data.costPerUnit, propertyid: this.data.id }
    const { data } = await this.transactionService.makeTransaction(body)
    this.transactionRef = data.transactionRef
    await this.getUserEmail()
    this.scripts()
    this.isAttached = true
  }

  private async getUserEmail() {
    const id = this.authService.getCurrentUserId()
    const { data } = await this.userService.getUserById(id)
    this.userEmail = data.email
  }


  private scripts() {
    const scripts = [
      {
        text: `
        function makePayment() {
          FlutterwaveCheckout({
            public_key: "${environment.flwPublicKey}",
            tx_ref: "${this.transactionRef}",
            amount: "${this.totalCost || this.data.costPerUnit}",
            customer: { email: "${this.userEmail}" },
            currency: "NGN",
            redirect_url: "${environment.flwRedirectUri}",
            customizations: {
              title: "Brickvest",
              description: "Payment for a real estate investment",
            },
          });
        }
        `,
        type: 'text/javascript',
        elem: document.body,
      }
    ]

    scripts.forEach((script) => {
      this.scriptElement = document.createElement('script')
      this.scriptElement.type = script.type
      this.scriptElement.text = script.text
      script.elem.appendChild(this.scriptElement)
    })
  }
}
