import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private actionSubject = new Subject<void>();

    triggerAction() {
        this.actionSubject.next();
    }

    getActionObservable() {
        return this.actionSubject.asObservable();
    }
}
