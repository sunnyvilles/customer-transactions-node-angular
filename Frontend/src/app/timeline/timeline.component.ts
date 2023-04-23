import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  loading: boolean | undefined;
  transactionSubscription: Subscription | undefined;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionSubscription = this.transactionService.getTransactionsByDay().subscribe(data => {
      console.log(data);
    });
    console.log('timeline');

  }
}
