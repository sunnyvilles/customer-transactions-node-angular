import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TransactionService } from '../services/transaction.service';
import { TimelineComponent } from './timeline.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TransactionsByDay } from '../models/transaction';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

const transactionData: TransactionsByDay =
{
  "id": "2022-11-08",
  "transactions": [{
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
  }]
};

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async () => {
    const allTransactionsSpy = jasmine.createSpyObj<TransactionService>(['getTransactions']);
    allTransactionsSpy.getTransactions.and.callFake(() => of([transactionData]))

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [TimelineComponent],
      providers: [
        {
          provide: TransactionService,
          useValue: allTransactionsSpy
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a service call and show the transaction data', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.date-container')).nativeNode.textContent).toBe('Tuesday, November 8, 2022');
  }))
});
