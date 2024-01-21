import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IsInternService {
    private isIntern = new BehaviorSubject<boolean>(false); // Initial value is an empty string
    isIntern$ = this.isIntern.asObservable();

    isInternUpdate(isIntern: boolean) {
        this.isIntern.next(isIntern);
    }
}
