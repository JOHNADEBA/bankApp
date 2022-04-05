import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcctDetailComponent } from './components/acct-detail/acct-detail.component';
import { CreateAcctComponent } from './components/create-acct/create-acct.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'open-acct', component: CreateAcctComponent },
  { path: 'transact', component: TransactionsComponent },
  { path: 'history', component: AcctDetailComponent },
  // { path: '', redirectTo: '/heroes-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
