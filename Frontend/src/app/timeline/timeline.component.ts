import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionsByDay, TransactionList } from '../models/transaction';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  loading = true;
  transactionSubscription: Subscription | undefined;
  transactionsList: TransactionList = new Map<string, Transaction[]>();
  recordsMapSortOrder() { return 0 }

  constructor(private transactionService: TransactionService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.transactionSubscription = this.transactionService.getTransactions().subscribe({
      next: data => {
        this.transactionsList = this.structureData(data);
      },
      error: err => this.handleError(err),
      complete: () => this.loading = false
    });
  }

  ngOnDestroy() {
    this.transactionSubscription?.unsubscribe();
  }

  structureData(data: TransactionsByDay[]) {
    const dataMap: TransactionList = new Map();
    data.forEach(dayRecord => dataMap.set(dayRecord.id, dayRecord.transactions));
    return dataMap;
  }

  handleError(message: string) {
    this.loading = false;
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }
}
