import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, retry, catchError, throwError } from 'rxjs';

import { AllTransactions, Transaction, TransactionsByDay } from '../models/transaction';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient, private sortService: SortService) { }

  getTransactions(): Observable<TransactionsByDay[]> {
    return this.http.get<AllTransactions>(`${this.baseUrl}api/transactions`).pipe(
      map((allTransactions: AllTransactions) => allTransactions.days.sort((a, b) => this.sortService.sortByDate(new Date(a.id), new Date(b.id))))
      , retry(1), catchError(this.onError));
  }

  onError(err: any): Observable<any> {
    const message = 'error while getting list of transactions: ' + err.status;
    return throwError(() => message);
  }

}