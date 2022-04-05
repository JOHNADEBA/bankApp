import { Component, OnInit } from '@angular/core';
import { StoreAccountService } from 'src/app/services/store-account.service';

@Component({
  selector: 'app-acct-detail',
  templateUrl: './acct-detail.component.html',
  styleUrls: ['./acct-detail.component.css'],
})
export class AcctDetailComponent implements OnInit {
  success = '';
  error = '';
  acctDetails: any;
  allTransactions: any;
  noTransactiion = ''

  constructor(private history: StoreAccountService) {}

  ngOnInit(): void {}

  getTransactionHistory(formData: string) {
    this.history.getAccount(formData).subscribe((results) => {
      if (results.length < 1) {
        this.error = 'This account do not exist.';
        return;
      }
      if (results[0].transactions === '') {
        this.noTransactiion = `Sorry ${results[0].name }, No transaction on your Account yet`;
        this.allTransactions = [];
        return;
      }
      this.error = '';
      this.acctDetails = results[0];
      this.allTransactions = JSON.parse(this.acctDetails.transactions);
    });
  }
}
