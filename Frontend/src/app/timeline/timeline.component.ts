import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionsByDay, TransactionList } from '../models/transaction';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  loading: boolean | undefined;
  transactionSubscription: Subscription | undefined;
  transactionsList: TransactionList = new Map<number, Transaction[]>();
  keyValueMapSort() { return 0 };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionSubscription = this.transactionService.getTransactions().subscribe(data => {
      this.transactionsList = this.structureData(data);
      console.log(this.transactionsList)
    });
  }

  ngOnDestroy() {
    this.transactionSubscription?.unsubscribe();
  }

  structureData(data: TransactionsByDay[]) {
    const dataMap: TransactionList = new Map();
    data.forEach(dayRecord => dataMap.set(new Date(dayRecord.id).getTime(), dayRecord.transactions));
    return dataMap;
  }

}
