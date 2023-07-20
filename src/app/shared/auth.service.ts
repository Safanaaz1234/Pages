import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({providedIn:'root'})
export class AuthService{
   user = new Subject<User>();
}