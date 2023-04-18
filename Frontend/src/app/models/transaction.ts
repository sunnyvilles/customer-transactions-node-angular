export interface Transaction {
    "id": number,
    "timestamp": Date,
    "amount": number,
    "currencyCode": string,
    "description": string,
    "otherParty": OtherParty
}

type OtherParty = {
    "name": string,
    "iban": string
}

export interface TransactionByDay {
    "id": string,
    "transactions": Transaction[]
}

export interface AllTransactions {
    "days": TransactionByDay[]
}