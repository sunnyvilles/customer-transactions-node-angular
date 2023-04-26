import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { CurrencyService } from '../services/currency-service.service';
import { TransactionService } from '../services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  transactionDetail: Transaction | undefined;
  transactionSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private currencyService: CurrencyService) { }

  ngOnInit() {
    const datekey: string = this.route.snapshot.params['datekey'];
    const id: number = this.route.snapshot.params['id'];

    this.transactionSubscription = this.transactionService.getTransactionById(datekey, id).subscribe(data => {
      this.transactionDetail = data;
    });

  }

  ngOnDestroy() {
    this.transactionSubscription?.unsubscribe();
  }
}
