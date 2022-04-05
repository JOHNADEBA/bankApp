import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreAccountService } from 'src/app/services/store-account.service';

@Component({
  selector: 'app-create-acct',
  templateUrl: './create-acct.component.html',
  styleUrls: ['./create-acct.component.css'],
})
export class CreateAcctComponent implements OnInit {
  amtValue = 1000;
  accounts: any = [];
  selected = 'savings';

  constructor(private newAcct: StoreAccountService, private route: Router) {}

  ngOnInit(): void {}
  onSubmit(formData: any) {
    const { name, acctType, amount } = formData;
    this.accounts = {
      accountnumber: Math.floor(Math.random() * 90000000) + 10000000,
      name,
      accounttype: acctType,
      balance: amount,
      transactions: null,
    };

    this.newAcct
      .addAccount(this.accounts)
      .subscribe((results) =>{
         console.log(results)
         this.route.navigate([''])
        
        });
  }
}
