import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreAccountService } from 'src/app/services/store-account.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  selected = 'Withdraw';
  acctName = 'No name found...';
  balance = 'Not Available...';
  error = '';
  success = '';
  transactionHistory: any = [];
  oneAcct: any;
  found: any;
  transactionArr: any = [];

  constructor(private transact: StoreAccountService, private route: Router) {}

  ngOnInit(): void {}

  getName(acctNo: any) {
    this.transact.getAccount(acctNo).subscribe((results) => {
      if (results == '' || results == 'Account do not exist') {
        this.acctName = 'No name found...';
        this.balance = 'Not Available...';
        return;
      }
      this.oneAcct = results[0];
      this.acctName = this.oneAcct.name;
      this.balance = this.oneAcct.balance;

      this.transactionArr =
        this.oneAcct.transactions !== ''
          ? JSON.parse(this.oneAcct.transactions)
          : this.oneAcct.transactions;
     });
  }
  onTransact(formData: any) {
    let { amount, balance, name, transType } = formData;
    if (name === 'No name found...' || balance == 'Not Available...') {
      this.error = 'Account do not exist';
      return;
    }

    if (formData.transType === 'Deposit') {
      
      let newTransaction = {
        date: Date.now(),
        amount,
        transactiontype: transType,
      };
      this.transactionArr = [newTransaction, ...this.transactionArr];

      formData = {
        ...formData,
        balance: (balance += amount),
        transactions: JSON.stringify(this.transactionArr),
      };
      this.updateDb(formData);
    }

    if (formData.transType === 'Withdraw') {
      let checkBal = this.oneAcct.balance - amount;

      if (this.oneAcct.accounttype === 'savings' && checkBal >= 1000) {
        this.withdrawBluePrint(formData, checkBal, amount, transType);
        this.error = '';
        this.success = 'Transaction Successfull';
      } else if (
        this.oneAcct.accounttype === 'current' &&
        checkBal >= -100000
      ) {
        this.withdrawBluePrint(formData, checkBal, amount, transType);
        this.error = '';
        this.success = 'Transaction Successfull';
      } else this.error = 'Insufficient funds';
    }
  }
  withdrawBluePrint(
    formData: any,
    checkBal: number,
    amount: number,
    transType: string
  ) {
    let newTransaction = {
      date: Date.now(),
      amount,
      transactiontype: transType,
    };

    this.transactionArr = [newTransaction, ...this.transactionArr];

    formData = {
      ...formData,
      balance: checkBal,
      transactions: JSON.stringify(this.transactionArr),
    };
    this.updateDb(formData);
  }

  updateDb(formData: any) {
    this.transact.updateAccount(formData).subscribe((results) => {
      if (results == 1) {
        this.success = 'Transaction Successfull';
        setTimeout(() => {
          this.route.navigate(['']);
        }, 5000);
      }
    });
  }
}
