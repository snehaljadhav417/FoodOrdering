import { Injectable } from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {SuggestionService} from '../services/suggestion/suggestion.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionResolverService {

  constructor(private suggestionService: SuggestionService) { }

  resolve(): Observable<any> | Observable<never> {

    return this.suggestionService.getSuggestions().pipe(
      take(1),
      mergeMap(data => {
        if (data) {
          return of(data);
        } else { // id not found
          return EMPTY;
        }
      })
    );
  }
}
