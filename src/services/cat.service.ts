import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Cat } from '../interfaces/cat.interface';

@Injectable({ providedIn: 'root' })
export class CatService {
  private http = inject(HttpClient);
  private apiUrl = 'https://cataas.com/api/cats?limit=30&skip=0';

  getCats(count: number): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl).pipe(
      map(cats => this.shuffleArray(cats).slice(0, count)),
      catchError(this.handleError)
    );
  }
  
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private handleError(error: any): Observable<Cat[]> {
    console.error('An error occurred', error);
    return of([] as Cat[]);
  }
}