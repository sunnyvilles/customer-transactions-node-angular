import { Injectable } from '@angular/core';

@Injectable()
export class SortService {

    sortByDate(d1: Date, d2: Date) {
        const key1 = new Date(d1).getTime();
        const key2 = new Date(d2).getTime();

        return key2 - key1;
    }
}