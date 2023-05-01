import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SortService } from './sort.service';
import { of } from 'rxjs';
import { Transaction } from '../models/transaction';

const transactionData: Transaction =
{
  "id": 1,
  "timestamp": new Date("2022-11-08T10:30:47.123456"),
  "amount": 17.95,
  "currencyCode": "USD",
  "currencyRate": 1.173628,
  "description": "Some interesting description",
  "otherParty": {
    "name": "Mister X",
    "iban": "NL00RABO0123456789"
  }
};

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SortService, {
        provide: HttpClient,
        useValue: httpClientSpyObj
      }],
    });

    transactionService = TestBed.inject(TransactionService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(transactionService).toBeTruthy();
  });

  it('should return the selected transaction when server request is made', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(transactionData));

    transactionService.getTransactionById('11-8-22', 1).subscribe({
      next: (result) => {
        expect(result).toEqual(transactionData);
        done();
      },
      error: () => {
        done.fail
      }
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  })
});
