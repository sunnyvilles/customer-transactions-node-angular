import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'https://api.freecurrencyapi.com/v1/latest';
  private apiKey = 'IxXmj83JBtHzZcD64tPtaa2GxS1daNsSB1Y4bg0N';

  usdToEuroFactor: number = 1.1;

  constructor(private http: HttpClient) {
    this.setCurrencyFactor('USD');
  }

  private setCurrencyFactor(currency: string) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&currencies=${currency}&base_currency=EUR`;
    return this.http.get<Currency>(url).subscribe(
      (factor: Currency) => this.usdToEuroFactor = factor.data['USD']);
  }

  getCurrencyInEur(value: number, currencyCode: string): number {
    if (currencyCode === 'USD') return value * this.usdToEuroFactor;
    return value;
  }
}
