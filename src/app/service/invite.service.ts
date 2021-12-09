import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private readonly url = 'http://localhost:3000/users';
  private existingUsers: ReplaySubject<User[]>;

  constructor(private http: HttpClient) {
    this.existingUsers = new ReplaySubject();
  }

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap(users => {
        this.existingUsers.next(users);
      })
    );
  }

  invite(user: User) {
    return this.http.post<User>(this.url, user).pipe(
      catchError(error => {
        return throwError({ error, user })
      })
    ).toPromise();
  }

  get exsitingUsers() {
    return this.existingUsers.asObservable();
  }
}
