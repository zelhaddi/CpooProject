import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PhotoChangeService {
    private photoSource = new BehaviorSubject<string>(''); // Initial value is an empty string
    currentPhoto = this.photoSource.asObservable();

    changePhoto(photo: string) {
        this.photoSource.next(photo);
    }
}
