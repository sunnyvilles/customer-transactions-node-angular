import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../models/transaction';
import { SortService } from '../services/sort.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() dayRecords: Transaction[] = [];
  @Input() showHeader = false;
  @Input() datekey: string | undefined;

  loading: boolean | undefined;

  columnList = ['partyName', 'amount'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Transaction>(this.orderByDate(this.dayRecords));
  }

  constructor(private sortService: SortService, private router: Router) { }

  onTransactionClick(transactionData: Transaction): void {
    this.router.navigate(["/detail/", this.datekey, transactionData.id]);
  }

  orderByDate(data: Transaction[]): Transaction[] {
    return data.sort((t1, t2) => this.sortService.sortByDate(t1.timestamp, t2.timestamp))
  }

  getCurrencyInEur(value = 0, currencyRate = 1): number {
    return value * currencyRate;
  }

}