/*
 Created by goat on 10/21/23
*/

import {Component} from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class MyPicturePromiseService {
    //create a promise of a picture (string)

    private picture = new BehaviorSubject<string>('');
    picture$ = this.picture.asObservable();


    changeMyPicture(photo: string) {
        this.picture.next(photo);
    }
}
