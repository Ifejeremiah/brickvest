import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css', './placeholder-anime.css']
})
export class TransactionsComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private transactionService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Onebrick - Transactions')
    this.checkRoles()
    this.getTransactions(1, 10)
  }

  public isFacilitator: boolean = false;

  private checkRoles(): void {
    if (this.authService.isFacilitator()) {
      this.isFacilitator = true
    }
  }

  private totalLimit: number = 10;

  public data: any

  public options = {
    all: '',
    pending: 'pending',
    success: 'success',
    failed: 'failed',
  }

  public defaultOption: string = this.options.all

  public transactions!: any[]

  public transaction: any

  private getTransactions(page: number, limit: number, status: string = '') {
    this.transactionService.getAllTransactions(page, limit, status)
      .then(response => {
        this.transactions = response.data.results
        response.data['totalLimit'] = this.totalLimit
        this.data = response.data;
      })
  }

  public getParamsFromChild(value: any): void {
    const { page, limit } = value;
    this.getTransactions(page, limit, this.defaultOption);
  }

  public doSort() {
    this.getTransactions(1, this.totalLimit, this.defaultOption)
  }

  public getTransactionId(id: string) {
    this.transactionService.getTransactionsById(id)
      .then(response => {
        this.transaction = response.data
      })
  }

}
