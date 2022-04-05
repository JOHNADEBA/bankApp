import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAcctComponent } from './components/create-acct/create-acct.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AcctDetailComponent } from './components/acct-detail/acct-detail.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, CreateAcctComponent, TransactionsComponent, AcctDetailComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
