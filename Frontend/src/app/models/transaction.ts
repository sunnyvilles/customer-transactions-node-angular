export interface Transaction {
    id: number,
    timestamp: Date,
    amount: number,
    currencyCode: string,
    currencyRate?: number,
    description?: string,
    otherParty?: OtherParty
}

export interface TransactionsByDay {
    id: string,
    transactions: Transaction[]
}

export interface AllTransactions {
    days: TransactionsByDay[]
}

type OtherParty = {
    name: string,
    iban: string
}

export type TransactionList = Map<string, Transaction[]>;