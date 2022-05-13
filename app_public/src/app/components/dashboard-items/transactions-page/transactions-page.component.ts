import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css']
})
export class TransactionsPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionsService
  ) { }

  private data = {
    transReference: '',
    flwTransId: ''
  }

  public message = 'Verifying transaction in progress...'

  ngOnInit(): void {
    this.getUrlQuery()
  }

  private doRedirect() {
    setTimeout(() => {
      this.router.navigate(['dashboard', 'co-own'])
    }, 6000)
  }

  private getUrlQuery() {
    this.route.queryParams.subscribe(async (params) => {
      if (!params['tx_ref'] || !params['transaction_id']) {
        this.router.navigate(['dashboard', 'overview'])
      } else {
        this.data.transReference = params['tx_ref']
        this.data.flwTransId = params['transaction_id']
        await this.doVerify(this.data)
      }
    })
  }

  private async doVerify(body: any) {
    const { data } = await this.transactionService.verifyTransaction(body)
    if (data.status === 'success') {
      this.message = 'Transaction successfull. Redirecting...'
      this.doRedirect()
    } else {
      this.message = 'Transaction failed. Please try again. Redirecting...'
      this.doRedirect()
    }
  }
}
