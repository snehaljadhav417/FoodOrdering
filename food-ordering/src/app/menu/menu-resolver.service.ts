import { Injectable } from '@angular/core';
import {MenuService} from "../services/menu/menu.service";
import {EMPTY, Observable, of} from "rxjs";
import {mergeMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MenuResolverService {

  constructor(private menuService: MenuService) {}

  resolve(): Observable<any> | Observable<never> {

    return this.menuService.getMenu().pipe(
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
