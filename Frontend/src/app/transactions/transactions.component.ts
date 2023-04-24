import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction, TransactionsByDay } from '../models/transaction';
import { SortService } from '../services/sort.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  // @Input() dayRecords: TransactionsByDay | undefined;
  @Input() dayRecords: Transaction[] = [];
  @Input() showHeader: boolean = false;

  loading: boolean | undefined;

  columnList: string[] = ['partyName', 'amount'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([]);;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Transaction>(this.orderByDate(this.dayRecords));
  }

  constructor(private sortService: SortService, private router: Router) { }

  onTransactionClick(transactionData: Transaction): void {
    this.router.navigate(["/detail/", transactionData.id], { queryParams: { transactionData } });
  }

  orderByDate(data: Transaction[]): Transaction[] {
    return data.sort((t1, t2) => this.sortService.sortByDate(t1.timestamp, t2.timestamp))
  }

}