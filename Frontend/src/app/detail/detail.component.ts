import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  loading = true;
  transactionDetail: Transaction | undefined;
  transactionSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const datekey: string = this.route.snapshot.params['datekey'];
    const id: number = this.route.snapshot.params['id'];

    this.transactionSubscription = this.transactionService.getTransactionById(datekey, id)
      .subscribe({
        next: data => {
          this.transactionDetail = data;
        },
        error: err => this.handleError(err),
        complete: () => this.loading = false
      });
  }

  getCurrencyInEur(value = 0, currencyRate = 1): number {
    return value * currencyRate;
  }

  handleError(message: string) {
    this.loading = false;
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

  ngOnDestroy() {
    this.transactionSubscription?.unsubscribe();
  }
}
