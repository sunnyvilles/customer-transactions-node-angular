import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction, TransactionsByDay } from '../models/transaction';
import { SortService } from '../services/sort.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency-service.service';
import { Currency } from '../models/currency';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() dayRecords: Transaction[] = [];
  @Input() showHeader: boolean = false;
  @Input() datekey: string | undefined;

  loading: boolean | undefined;

  columnList: string[] = ['partyName', 'amount'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Transaction>(this.orderByDate(this.dayRecords));
  }

  constructor(private sortService: SortService, private router: Router, private currencyService: CurrencyService) { }

  onTransactionClick(transactionData: Transaction): void {
    let data = JSON.stringify(transactionData);
    this.router.navigate(["/detail/", this.datekey, transactionData.id]);
  }

  orderByDate(data: Transaction[]): Transaction[] {
    return data.sort((t1, t2) => this.sortService.sortByDate(t1.timestamp, t2.timestamp))
  }

  getCurrencyInEur(value: number, currencyCode: string): number {
    return this.currencyService.getCurrencyInEur(value, currencyCode);
  }

}