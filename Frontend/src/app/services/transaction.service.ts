import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getTreatmentsByDay(): Observable<Transaction[]> {
    const d = this.http.get<Transaction[]>(`${this.baseUrl}/api/transactions/2022-11-02`).pipe(
      catchError(err => {
        console.log('Error loading data .', err);
        return of([]); //new Error('Error loading data .')
      })
    );
    d.subscribe((da) => console.log(da));
    return d;
  }
}
