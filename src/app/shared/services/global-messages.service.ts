import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessagesService {
  private _menuServiceBS: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private _pageDataBS: BehaviorSubject<IPage[]> = new BehaviorSubject(undefined);
  constructor() { }
  setMenuService(data: any) {
    this._menuServiceBS.next(data);
  }
  get menuService(): Observable<any> {
    return this._menuServiceBS.asObservable();
  }
  setPageData(data: IPage[]) {
    this._pageDataBS.next(data);
  }
  getPageDataSynch(): IPage[] {
    return this._pageDataBS.getValue();
  }
  get pageData(): Observable<IPage[]> {
    return this._pageDataBS.asObservable();
  }
}
