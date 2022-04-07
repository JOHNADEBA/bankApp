import { Component, OnInit } from '@angular/core';
import { StoreAccountService } from 'src/app/services/store-account.service';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-acct-detail',
  templateUrl: './acct-detail.component.html',
  styleUrls: ['./acct-detail.component.css'],
})
export class AcctDetailComponent implements OnInit {
  success = '';
  error = '';
  acctDetails: any;
  allTransactions: any = [];
  noTransactiion = '';

  lineChartData: ChartDataSets[] = [{ data: [], label: 'transactions' }];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(private history: StoreAccountService) {}

  ngOnInit(): void {}

  getTransactionHistory(formData: string) {
    this.history.getAccount(formData).subscribe((results) => {
      if (results.length < 1) {
        this.error = 'This account do not exist.';

        return;
      }
      if (results[0].transactions === '') {
        this.acctDetails = results[0];
        this.noTransactiion = `Sorry ${results[0].name}, No transaction on your Account yet`;
        this.allTransactions = [];

        return;
      }
      this.error = '';
      this.noTransactiion = '';
      this.acctDetails = results[0];
      this.allTransactions = JSON.parse(this.acctDetails.transactions);

      const date = this.allTransactions.map((date: any) =>
        new Date(date.date).toLocaleDateString('en-UK')
      );
      const amount = this.allTransactions.map((amt: any) => amt.amount);

      this.lineChartData[0].data = amount;
      this.lineChartLabels = date;
    });
  }
}
