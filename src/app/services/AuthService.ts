import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validUsername = 'testuser';
  private readonly validPassword = 'testpass';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  private loginEventSubject = new BehaviorSubject<string | null>(null);
  public loginEvent$ = this.loginEventSubject.asObservable();

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this.loggedInSubject.next(true);
      this.loginEventSubject.next(username);
      return true;
    } else {
      this.loggedInSubject.next(false);
      this.loginEventSubject.next(null);
      return false;
    }
  }

  logout() {
    this.loggedInSubject.next(false);
    this.loginEventSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}